# OpenCVメモ
## 学生時メモ
### テキストベース　Githubで管理
```python
# OpenCV のインポート
import cv2

#xmlパスの指定
face_cascade_path = 'パス名'
#face_cascade_path = 'パス名'

#色の指定
color = (255,0,255)

# VideoCaptureのインスタンスを作成する。
# 引数でカメラを選ぶ。
cap = cv2.VideoCapture(0)

#xmlファイルの読み込み
face_cascade = cv2.CascadeClassifier(face_cascade_path)

while True:
    # VideoCaptureから1フレーム読み込む
    ret, frame = cap.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=10)

    #複数顔があった場合の検出
    for x, y, w, h in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h),color, 2)
        face = frame[y: y + h, x: x + w]
        face_gray = gray[y: y + h, x: x + w]

    # 加工なし画像を表示する
    cv2.imshow('Raw Frame', frame)

    # キー入力を1ms待って、k が27（ESC）だったらBreakする
    k = cv2.waitKey(1)
    if k == 27:
        break

# キャプチャをリリースして、ウィンドウをすべて閉じる
cap.release()
cv2.destroyAllWindows()
```