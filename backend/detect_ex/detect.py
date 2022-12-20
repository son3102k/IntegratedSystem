import cv2


def detect_cau(file, column):
    img = cv2.imread(file + "/image_full.png", cv2.IMREAD_COLOR)
    image_cau = cv2.imread(file + "/cau.png", cv2.IMREAD_COLOR)
    print(img.shape)
    print(image_cau.shape)

    list_cau = []

    for i in range(img.shape[0]-image_cau.shape[0]):
        for j in range(column-5,column + 10):
            image_ = img[i:i+image_cau.shape[0],j:j+image_cau.shape[1],:]
            comparison = image_cau == image_
            equal_image = comparison.all()
            if equal_image:
                list_cau.append((i,j))

    # comparison = image_cau == image_cau1
    # equal_image = comparison.all()
    for i in range(len(list_cau)-1):
            image_detect = img[list_cau[i][0]-10:list_cau[i+1][0]-10,list_cau[i][1]-20:,:]
            cv2.imwrite(file + f"/cau{i+1}.png", image_detect)
        
    # cv2.imshow("image_detect", image_detect)
    # cv2.waitKey(0)
    return