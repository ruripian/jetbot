print("이미지 링크를 복사해서 붙여넣어주세요")
input_img_link = input()

{input_img_link}

html_text = f"""
<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <title>360&deg; Image Workshop</title>
        <meta name="description" content="360&deg; Image Workshop" />
        <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
        <script src="./switcher.js"></script>
    </head>
    <body>
        <a-scene>
        <a-assets>
        
            <img
            id="office"
            src="{input_img_link}"
            />
            
        </a-assets>

        <a-entity camera look-controls>
            <a-entity
            cursor="fuse: true; fuseTimeout: 1000"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: black; shader: flat"
            >
            </a-entity>
        </a-entity>

        <a-entity screen-switch="screen:patio">
            <a-entity screen="patio">
            <a-sky src="#office" rotation="0 90 0"></a-sky>


            </a-entity>

            <a-entity screen="hotel-room">
            <a-sky src="#hotel"></a-sky>
            </a-entity>

            <a-entity screen="shed">
            <a-sky src="#shed" rotation="0 90 0"></a-sky>
            <a-sphere
                color="yellow"
                radius="0.2"
                position="2 0 4"
                to-screen="patio"
            ></a-sphere>
            </a-entity>
        </a-entity>
        </a-scene>
        <div
        class="glitchButton"
        style="position: fixed; top: 20px; right: 20px"
        ></div>
        <script src="https://button.glitch.me/button.js"></script>
    </body>
    </html>
"""

with open('index.html', 'w') as html_file:
    html_file.write(html_text)