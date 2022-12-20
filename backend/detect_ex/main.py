import pdftoimage
import detect
import extract_cau
poppler_path = "C:\\Users\\trilt1\\Documents\\20221\\THHT\\code\\poppler-0.68.0\\bin"
# Tạo đường dẫn tới poppler
if __name__ == "__main__":
    file = 'dethi/dethi1'
    pdftoimage.creat_image(file=file, poppler_path=poppler_path)
    y1, y2, column = extract_cau.extract_cau_(file)
    pdftoimage.creat_image_full(file=file,num_pages=7, y1 = y1, y2 = y2, column=column)
    detect.detect_cau(file, column=column)