# image_detect = img[1090:1160,550:690,:]
# cv2.imwrite("cau.png", image_detect)
# cv2.imshow("image_detect", image_detect)
# cv2.waitKey(0)
import cv2
import numpy as np

def check_cau(image_cau, img, column):
    list_cau = []

    for i in range(img.shape[0]-image_cau.shape[0]):
        for j in range(column-15,column+10):
            image_ = img[i:i+image_cau.shape[0],j:j+image_cau.shape[1],:]
            comparison = image_cau == image_
            equal_image = comparison.all()
            if equal_image:
                list_cau.append((i,j))
    if len(list_cau) >= 4:
        return True
    else:
        return False

def extract_cau_(file):
    img = cv2.imread(file+"/page1_cutted.png", cv2.IMREAD_COLOR)
    h,w,c = img.shape
    # print(img.shape)
    column_white = img[h*3//4:,0,:]
    # print(column_white.shape)
    column = 0
    # column_1 = 0
    # column_2 = 0
    while True:
        comparison = column_white == img[h*3//4:,column,:]
        equal_image = comparison.all()
        if equal_image == False:
            # print(column)
            # img_____ = img[:,column:,:]
            # cv2.imwrite(file+"/xxxxx.png", img_____)
            img_column = img[h*3//4:,column,:]
            line = img_column.shape[0]-1
            while True:
                comparison1 = img_column[-1,:] == img_column[line,:]
                equal_image1 = comparison1.all()
                if equal_image1 == False:
                    # img_____ = img[:h-line,column:,:]
                    # cv2.imwrite(file+"/xxxxx.png", img_____)
                    img_cau = img[h-img_column.shape[0]+line-40:h-img_column.shape[0]+line+30,column-10:column+150,:]
                    if check_cau(img_cau, img, column):
                        cv2.imwrite(file+"/cau.png", img_cau)
                        return column
                line -= 1
                if line < 50:
                    break
        column += 1

def extract_ABCD(index, file):
    img = cv2.imread(file+f"/cau{index}.png", cv2.IMREAD_COLOR)
    image_cau = cv2.imread(file + "/cau.png", cv2.IMREAD_COLOR)
    img = img[image_cau.shape[0]+30:,:,:]
    h,w,c = img.shape
    column_white = img[:,0,:]
    column = 0
    while True:
        comparison = column_white == img[:,column,:]
        equal_image = comparison.all()
        if equal_image == False:
            img_column = img[:,column,:]
            line = img_column.shape[0]-1
            while True:
                comparison1 = img_column[-1,:] == img_column[line,:]
                equal_image1 = comparison1.all()
                if equal_image1 == False:
                    line -= 10
                    space = []
                    count = 0
                    for c in range(column,img.shape[1]):
                        comparison2 = img_column[-1,:] == img[line,c,:]
                        equal_image2 = comparison2.all()
                        if equal_image2 == True:
                            count += 1
                        else:
                            space.append([count,c])
                            count = 0

                    space_check = []
                    for s in space:
                        if s[0] > 100:
                            space_check.append(s)                  

                    extract_(space_check, line, column, img, file)

                    return 
                line -= 1
        column += 1
    return

def extract_(space_check, line, column, img, file):
    answer_A = img[line-50:line+15, column:column+50,:]
    answer_B = img[line-50:line+15, space_check[0][1]:space_check[0][1]+50,:]
    answer_C = img[line-50:line+15, space_check[1][1]:space_check[1][1]+50,:]
    answer_D = img[line-50:line+15, space_check[2][1]:space_check[2][1]+50,:]
    # cv2.imshow("window_name", answer_A)
    # cv2.waitKey(0)
    # cv2.imshow("window_name", answer_B)
    # cv2.waitKey(0)
    # cv2.imshow("window_name", answer_C)
    # cv2.waitKey(0)
    # cv2.imshow("window_name", answer_D)
    # cv2.waitKey(0)
    cv2.imwrite(file+"/answer_A.png", answer_A)
    cv2.imwrite(file+"/answer_B.png", answer_B)
    cv2.imwrite(file+"/answer_C.png", answer_C)
    cv2.imwrite(file+"/answer_D.png", answer_D)

    return

if __name__ == "__main__":
    extract_ABCD(6, "dethi/dethi3")
