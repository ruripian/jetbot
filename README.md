## 프로젝트명 : 360도 사진 생성기

## 프로젝트 소개
* 작은 공간에서 빠른 시간내에 360도 이미지에 필요한 사진을 촬영하여 손 쉽게 건물 내부 전경을 파악할 수 있도록 함
* jetbot을 이용하여 사진 생성 후 스티칭하여 360도 사진을 생성,  Glitch web을 이용하여 확인 가능한 뷰어에 연결하고자 함

* 예시 사이트 : [360도 이미지를 이용한 AR 광인사][AR]

## 사용 예제

동작중인 [jetson nano][jetson_nano]</p>
<img src="https://github.com/ruripian/jetbot/blob/main/jets.gif?raw=true" width="400" height="280"/>

동작하면서 촬영되는 사진</p>
    ![snap_image](https://user-images.githubusercontent.com/35488852/206225482-e06394f1-d27b-4965-9391-45a4715a6836.jpg)
    ![snap_image2](https://user-images.githubusercontent.com/35488852/206225506-fe3edea8-be46-4d7e-bb3d-1e5542b324cc.jpg)

## 코드블럭 설명

- live.ipynb
```py
def update(change):
    global blocked_slider, robot
    global count
    x = change['new'] 
    x = preprocess(x)
    y = model(x)
    y = F.softmax(y, dim=1)
    
    prob_blocked = float(y.flatten()[0])
    
    blocked_slider.value = prob_blocked
    
    if prob_blocked < 0.5:
        robot.forward(speed_slider.value)
    else:
        if count < 500:
            robot.left(speed_slider.value)
            count = count + 1
        elif (count >= 500 & count < 2000):
            robot.left(speed_slider.value)
            count = count + 1
            if (count >= 500) & (count % 50 == 0):
                robot.left(speed_slider.value)
                save_snapshot('data')
                count = count + 1
        if (count >= 2000):
            camera.unobserve(update, names='value')
            time.sleep(0.1)  
            robot.stop()
    
    time.sleep(0.001)
```

- stitch.py
```py
status, dst = stitcher.stitch(imgs)

if status != cv2.Stitcher_OK:
    print('Stitch failed!')
    sys.exit()
    
# 결과 사진 저장
cv2.imwrite('output.jpg', dst)
``` 

- create_html.py 

create_html.py를 실행 후 다음과 같이 이미지 링크를 입력해주세요.
```cmd
이미지 링크를 복사해서 붙여 넣어주세요
https://cdn.glitch.global/a51c714d-5e77-43bd-b05f-915fdd7754da/c60c0314-7610-11ed-b6d2-8c554abccd48.jpg?v=1670422146218
```

## 향후 개선점

* 이미지 스티칭
    * 일반 카매라로 작업시 수작업이 아닌 opencv() 함수 또는 다른 stitching 기법을 통한 자동화 필요
    * 또는 360도 화각을 지원하는 카매라를 이용하여 전용 이미지를 사용
* 동작제어
    * 추적하던 사람이 사라지면 그 자리에서 주변을 촬영하는 방식에서
    음성을 통하여 제어를 해야할 필요성이 있음
* 사진 촬영시 각도 조절
    * 기기의 높이가 매우 낮아 상대적으로 위쪽을 바라보고 사진 촬영을 해야 함
<br>  이 경우 사진 스티칭을 할 때 경계선이 맞지 않아서 되도록 정면을 보도록 변경 
* glitch
    * 이미지를 자동으로 올리고 주소를 얻는 방법을 찾아야 함
    * 또는 local에서 이미지를 바로 `a-assets` 안에서 인식되게 해야함


## Glitch web

* Glitch web을 이용하여 생성한 사진을 viewer 위에 올림</p>
![Glitch](https://user-images.githubusercontent.com/35488852/206226549-6b11a386-9a4b-4dd4-8258-f6785931f79e.jpg)


<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[jetson_nano]: https://www.youtube.com/watch?v=mithR32HSnI&feature=youtu.be
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
[AR]: https://incredible-relic-laugh.glitch.me/index2.html