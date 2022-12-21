# image_detect = img[1090:1160,550:690,:]
# cv2.imwrite("cau.png", image_detect)
# cv2.imshow("image_detect", image_detect)
# cv2.waitKey(0)
import cv2
import numpy as np
def extract_cau_(file):
    img = cv2.imread(file+"/page1.png", cv2.IMREAD_COLOR)

    print(img.shape)
    line_white = img[-1,:img.shape[1]//5,:]
    print(line_white.shape)
    line = img.shape[0]-1
    line_h = 0
    line_l = 0
    column = 0
    while True:
        comparison = line_white == img[line,:img.shape[1]//5,:]
        equal_image = comparison.all()
        if equal_image == False:
            print(line)
            line_l = line
            while True:
                comparison1 = line_white == img[line,:img.shape[1]//5,:]
                equal_image1 = comparison1.all()
                if equal_image1 == True:
                    line_h = line
                    line_img = img[line+10,:img.shape[1]//5,:]
                    for i in range(0,line_img.shape[0]):
                        comparison2 = line_img[i,:] == line_img[0,:]
                        equal_image2 = comparison2.all()
                        if equal_image2:
                            continue
                        column = i
                        break
                    print(column)
                    img_cau = img[line_h-15:line_l+15,column-20:column+140,:]
                    cv2.imwrite(file+"/cau.png", img_cau)
                    return line_h - 15, line_l + 15, column - 20
                line -= 1
        line -= 1
