from pdf2image import convert_from_path
import os
import cv2

def del_last_page(img):
    line_white = img[-1,:,:]
    line = img.shape[0]-1
    line_h = 0
    line_l = 0
    while True:
        comparison = line_white == img[line,:,:]
        equal_image = comparison.all()
        if equal_image == False:
            line_l = line
            while True:
                comparison1 = line_white == img[line,:,:]
                equal_image1 = comparison1.all()
                if equal_image1 == True:
                    line_h = line
                    return line_h - 10
                line -= 1
        line -= 1
def creat_image(file, fn_file = '.pdf', poppler_path = ''):
    pages = convert_from_path(file+fn_file, 500)

    try:
        os.mkdir(file)
        print("da tao thu muc " + file)
    except:
        print("da tao thu muc " + file)

    num_image = 1
    for page in pages:
        page.save(file + f'/page{num_image}.png', 'PNG')
        num_image += 1
def creat_image_full(file, num_pages):
    image = []
    for i in range(1,num_pages+1):
        img  = cv2.imread(file + f"/page{i}.png", cv2.IMREAD_COLOR)
        line_h = del_last_page(img)
        img = img[:line_h,:,:]
        cv2.imwrite(file + f"/page{i}_cutted.png", img)
        image.append(img)
    for i in range(1,num_pages):
        image[0] = cv2.vconcat([image[0], image[i]])
    # image_cau = cv2.imread(file + "/cau.png", cv2.IMREAD_COLOR)
    # image[0][y1-y2-1:-1,column:column+160,:] = image_cau
    cv2.imwrite(file+"/image_full.png", image[0])