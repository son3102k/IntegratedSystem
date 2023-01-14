import pdftoimage
import detect
import extract_cau
import argparse
import extract_answer
# Tạo đường dẫn tới poppler

def parse_args():
    parser = argparse.ArgumentParser(description = 'detect ex')
    parser.add_argument('-f', '--file', help='file pdf input')
    parser.add_argument('-pp', '--poppler_path',default= "./poppler-21.09.0/bin", help='file pdf input')
    args = parser.parse_args()
    return args


if __name__ == "__main__":
    args = parse_args()
    file = args.file
    poppler_path = args.poppler_path
    pdftoimage.creat_image(file=file, poppler_path=poppler_path)
    for i in [8,7,6,5]:
        try:
            pdftoimage.creat_image_full(file=file,num_pages=i)
        
            # y1, y2, 
            column = extract_cau.extract_cau_(file)
            
            index_cau_h_min = detect.detect_cau(file, column=column)
            extract_cau.extract_ABCD(index_cau_h_min, file)
            extract_answer.extract_answer(file)
            break
        except:
            continue