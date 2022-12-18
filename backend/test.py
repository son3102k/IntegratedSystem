import pandas as pd
from string_grouper import match_strings, match_most_similar, \
	group_similar_strings, compute_pairwise_similarities, \
	StringGrouper
import json


list_object = [
        {
            "title": "Đề giữa học kì 1 Toán 12 năm 2021 – 2022 trường THPT Thị xã Quảng Trị",
            "link": "https://toanmath.com/2021/12/de-giua-hoc-ki-1-toan-12-nam-2021-2022-truong-thpt-thi-xa-quang-tri.html",
            "date": "21 Tháng Mười Hai, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Việt Yên 1 – Bắc Giang",
            "link": "https://toanmath.com/2021/12/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-viet-yen-1-bac-giang.html",
            "date": "3 Tháng Mười Hai, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa HK1 Toán 12 năm 2021 – 2022 trường THPT Huỳnh Ngọc Huệ – Quảng Nam",
            "link": "https://toanmath.com/2021/11/de-giua-hk1-toan-12-nam-2021-2022-truong-thpt-huynh-ngoc-hue-quang-nam.html",
            "date": "28 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Lương Ngọc Quyến – Thái Nguyên",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-luong-ngoc-quyen-thai-nguyen.html",
            "date": "28 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa HK1 Toán 12 năm 2021 – 2022 trường THPT Ngô Gia Tự – Đắk Lắk",
            "link": "https://toanmath.com/2021/11/de-giua-hk1-toan-12-nam-2021-2022-truong-thpt-ngo-gia-tu-dak-lak.html",
            "date": "28 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Phú Lương – Thái Nguyên",
            "link": "https://toanmath.com/2021/11/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-phu-luong-thai-nguyen.html",
            "date": "27 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề KSCL 8 tuần HK1 Toán 12 năm 2021 – 2022 trường chuyên Lê Hồng Phong – Nam Định",
            "link": "https://toanmath.com/2021/11/de-kscl-8-tuan-hk1-toan-12-nam-2021-2022-truong-chuyen-le-hong-phong-nam-dinh.html",
            "date": "27 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Nguyễn Cảnh Chân – Nghệ An",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-nguyen-canh-chan-nghe-an.html",
            "date": "19 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Đoàn Thượng – Hải Dương",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-doan-thuong-hai-duong.html",
            "date": "17 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề thi giữa học kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Nhân Chính – Hà Nội",
            "link": "https://toanmath.com/2021/11/de-thi-giua-hoc-ky-1-toan-12-nam-2021-2022-truong-thpt-nhan-chinh-ha-noi.html",
            "date": "13 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa HK1 Toán 12 năm 2021 – 2022 trường THPT Nguyễn Huệ – BR VT",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-hk1-toan-12-nam-2021-2022-truong-thpt-nguyen-hue-br-vt.html",
            "date": "13 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa học kỳ 1 Toán 12 năm 2021 – 2022 sở GD&ĐT Bắc Ninh",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-hoc-ky-1-toan-12-nam-2021-2022-so-gddt-bac-ninh.html",
            "date": "12 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa học kì 1 Toán 12 năm 2021 – 2022 trường THPT Nguyễn Khuyến – BR VT",
            "link": "https://toanmath.com/2021/11/de-giua-hoc-ki-1-toan-12-nam-2021-2022-truong-thpt-nguyen-khuyen-br-vt.html",
            "date": "12 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Trần Hưng Đạo – Nam Định",
            "link": "https://toanmath.com/2021/11/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-tran-hung-dao-nam-dinh.html",
            "date": "8 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề ôn tập giữa kì 1 Toán 12 năm 2021 – 2022 trường Thuận Thành 1 – Bắc Ninh",
            "link": "https://toanmath.com/2021/11/de-on-tap-giua-ki-1-toan-12-nam-2021-2022-truong-thuan-thanh-1-bac-ninh.html",
            "date": "7 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa học kỳ 1 Toán 12 năm 2021 – 2022 trường THPT chuyên Vĩnh Phúc",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-hoc-ky-1-toan-12-nam-2021-2022-truong-thpt-chuyen-vinh-phuc.html",
            "date": "6 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Hồ Nghinh – Quảng Nam",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-ho-nghinh-quang-nam.html",
            "date": "5 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT A Nghĩa Hưng – Nam Định",
            "link": "https://toanmath.com/2021/11/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-a-nghia-hung-nam-dinh.html",
            "date": "5 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Núi Thành – Quảng Nam",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-nui-thanh-quang-nam.html",
            "date": "1 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề minh họa giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Bảo Thắng 2 – Lào Cai",
            "link": "https://toanmath.com/2021/10/de-minh-hoa-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-bao-thang-2-lao-cai.html",
            "date": "31 Tháng Mười, 2021",
            "source": "toanmath"
        }
    ]+[
        {
            "title": "Đề giữa học kì 1 Toán 12 năm 2021 – 2022 trường THPT Thị xã Quảng Trị",
            "link": "https://toanmath.com/2021/12/de-giua-hoc-ki-1-toan-12-nam-2021-2022-truong-thpt-thi-xa-quang-tri.html",
            "date": "21 Tháng Mười Hai, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Việt Yên 1 – Bắc Giang",
            "link": "https://toanmath.com/2021/12/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-viet-yen-1-bac-giang.html",
            "date": "3 Tháng Mười Hai, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa HK1 Toán 12 năm 2021 – 2022 trường THPT Huỳnh Ngọc Huệ – Quảng Nam",
            "link": "https://toanmath.com/2021/11/de-giua-hk1-toan-12-nam-2021-2022-truong-thpt-huynh-ngoc-hue-quang-nam.html",
            "date": "28 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Lương Ngọc Quyến – Thái Nguyên",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-luong-ngoc-quyen-thai-nguyen.html",
            "date": "28 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa HK1 Toán 12 năm 2021 – 2022 trường THPT Ngô Gia Tự – Đắk Lắk",
            "link": "https://toanmath.com/2021/11/de-giua-hk1-toan-12-nam-2021-2022-truong-thpt-ngo-gia-tu-dak-lak.html",
            "date": "28 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Phú Lương – Thái Nguyên",
            "link": "https://toanmath.com/2021/11/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-phu-luong-thai-nguyen.html",
            "date": "27 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề KSCL 8 tuần HK1 Toán 12 năm 2021 – 2022 trường chuyên Lê Hồng Phong – Nam Định",
            "link": "https://toanmath.com/2021/11/de-kscl-8-tuan-hk1-toan-12-nam-2021-2022-truong-chuyen-le-hong-phong-nam-dinh.html",
            "date": "27 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Nguyễn Cảnh Chân – Nghệ An",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-nguyen-canh-chan-nghe-an.html",
            "date": "19 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Đoàn Thượng – Hải Dương",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-doan-thuong-hai-duong.html",
            "date": "17 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề thi giữa học kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Nhân Chính – Hà Nội",
            "link": "https://toanmath.com/2021/11/de-thi-giua-hoc-ky-1-toan-12-nam-2021-2022-truong-thpt-nhan-chinh-ha-noi.html",
            "date": "13 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa HK1 Toán 12 năm 2021 – 2022 trường THPT Nguyễn Huệ – BR VT",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-hk1-toan-12-nam-2021-2022-truong-thpt-nguyen-hue-br-vt.html",
            "date": "13 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa học kỳ 1 Toán 12 năm 2021 – 2022 sở GD&ĐT Bắc Ninh",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-hoc-ky-1-toan-12-nam-2021-2022-so-gddt-bac-ninh.html",
            "date": "12 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa học kì 1 Toán 12 năm 2021 – 2022 trường THPT Nguyễn Khuyến – BR VT",
            "link": "https://toanmath.com/2021/11/de-giua-hoc-ki-1-toan-12-nam-2021-2022-truong-thpt-nguyen-khuyen-br-vt.html",
            "date": "12 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Trần Hưng Đạo – Nam Định",
            "link": "https://toanmath.com/2021/11/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-tran-hung-dao-nam-dinh.html",
            "date": "8 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề ôn tập giữa kì 1 Toán 12 năm 2021 – 2022 trường Thuận Thành 1 – Bắc Ninh",
            "link": "https://toanmath.com/2021/11/de-on-tap-giua-ki-1-toan-12-nam-2021-2022-truong-thuan-thanh-1-bac-ninh.html",
            "date": "7 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa học kỳ 1 Toán 12 năm 2021 – 2022 trường THPT chuyên Vĩnh Phúc",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-hoc-ky-1-toan-12-nam-2021-2022-truong-thpt-chuyen-vinh-phuc.html",
            "date": "6 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Hồ Nghinh – Quảng Nam",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-ho-nghinh-quang-nam.html",
            "date": "5 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT A Nghĩa Hưng – Nam Định",
            "link": "https://toanmath.com/2021/11/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-a-nghia-hung-nam-dinh.html",
            "date": "5 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Núi Thành – Quảng Nam",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-nui-thanh-quang-nam.html",
            "date": "1 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề minh họa giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Bảo Thắng 2 – Lào Cai",
            "link": "https://toanmath.com/2021/10/de-minh-hoa-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-bao-thang-2-lao-cai.html",
            "date": "31 Tháng Mười, 2021",
            "source": "toanmath"
        }
    ]+[
        {
            "title": "Đề giữa học kì 1 Toán 12 năm 2021 – 2022 trường THPT Thị xã Quảng Trị",
            "link": "https://toanmath.com/2021/12/de-giua-hoc-ki-1-toan-12-nam-2021-2022-truong-thpt-thi-xa-quang-tri.html",
            "date": "21 Tháng Mười Hai, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Việt Yên 1 – Bắc Giang",
            "link": "https://toanmath.com/2021/12/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-viet-yen-1-bac-giang.html",
            "date": "3 Tháng Mười Hai, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa HK1 Toán 12 năm 2021 – 2022 trường THPT Huỳnh Ngọc Huệ – Quảng Nam",
            "link": "https://toanmath.com/2021/11/de-giua-hk1-toan-12-nam-2021-2022-truong-thpt-huynh-ngoc-hue-quang-nam.html",
            "date": "28 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Lương Ngọc Quyến – Thái Nguyên",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-luong-ngoc-quyen-thai-nguyen.html",
            "date": "28 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa HK1 Toán 12 năm 2021 – 2022 trường THPT Ngô Gia Tự – Đắk Lắk",
            "link": "https://toanmath.com/2021/11/de-giua-hk1-toan-12-nam-2021-2022-truong-thpt-ngo-gia-tu-dak-lak.html",
            "date": "28 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Phú Lương – Thái Nguyên",
            "link": "https://toanmath.com/2021/11/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-phu-luong-thai-nguyen.html",
            "date": "27 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề KSCL 8 tuần HK1 Toán 12 năm 2021 – 2022 trường chuyên Lê Hồng Phong – Nam Định",
            "link": "https://toanmath.com/2021/11/de-kscl-8-tuan-hk1-toan-12-nam-2021-2022-truong-chuyen-le-hong-phong-nam-dinh.html",
            "date": "27 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Nguyễn Cảnh Chân – Nghệ An",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-nguyen-canh-chan-nghe-an.html",
            "date": "19 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Đoàn Thượng – Hải Dương",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-doan-thuong-hai-duong.html",
            "date": "17 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề thi giữa học kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Nhân Chính – Hà Nội",
            "link": "https://toanmath.com/2021/11/de-thi-giua-hoc-ky-1-toan-12-nam-2021-2022-truong-thpt-nhan-chinh-ha-noi.html",
            "date": "13 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa HK1 Toán 12 năm 2021 – 2022 trường THPT Nguyễn Huệ – BR VT",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-hk1-toan-12-nam-2021-2022-truong-thpt-nguyen-hue-br-vt.html",
            "date": "13 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa học kỳ 1 Toán 12 năm 2021 – 2022 sở GD&ĐT Bắc Ninh",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-hoc-ky-1-toan-12-nam-2021-2022-so-gddt-bac-ninh.html",
            "date": "12 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa học kì 1 Toán 12 năm 2021 – 2022 trường THPT Nguyễn Khuyến – BR VT",
            "link": "https://toanmath.com/2021/11/de-giua-hoc-ki-1-toan-12-nam-2021-2022-truong-thpt-nguyen-khuyen-br-vt.html",
            "date": "12 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Trần Hưng Đạo – Nam Định",
            "link": "https://toanmath.com/2021/11/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-tran-hung-dao-nam-dinh.html",
            "date": "8 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề ôn tập giữa kì 1 Toán 12 năm 2021 – 2022 trường Thuận Thành 1 – Bắc Ninh",
            "link": "https://toanmath.com/2021/11/de-on-tap-giua-ki-1-toan-12-nam-2021-2022-truong-thuan-thanh-1-bac-ninh.html",
            "date": "7 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa học kỳ 1 Toán 12 năm 2021 – 2022 trường THPT chuyên Vĩnh Phúc",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-hoc-ky-1-toan-12-nam-2021-2022-truong-thpt-chuyen-vinh-phuc.html",
            "date": "6 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kì 1 Toán 12 năm 2021 – 2022 trường THPT Hồ Nghinh – Quảng Nam",
            "link": "https://toanmath.com/2021/11/de-giua-ki-1-toan-12-nam-2021-2022-truong-thpt-ho-nghinh-quang-nam.html",
            "date": "5 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT A Nghĩa Hưng – Nam Định",
            "link": "https://toanmath.com/2021/11/de-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-a-nghia-hung-nam-dinh.html",
            "date": "5 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề kiểm tra giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Núi Thành – Quảng Nam",
            "link": "https://toanmath.com/2021/11/de-kiem-tra-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-nui-thanh-quang-nam.html",
            "date": "1 Tháng Mười Một, 2021",
            "source": "toanmath"
        },
        {
            "title": "Đề minh họa giữa kỳ 1 Toán 12 năm 2021 – 2022 trường THPT Bảo Thắng 2 – Lào Cai",
            "link": "https://toanmath.com/2021/10/de-minh-hoa-giua-ky-1-toan-12-nam-2021-2022-truong-thpt-bao-thang-2-lao-cai.html",
            "date": "31 Tháng Mười, 2021",
            "source": "toanmath"
        }
    ]

dictionary = {}
list_str = []
for obj in list_object:
    dictionary[obj["title"].lower()] = obj
    list_str.append(obj["title"].lower())
import numpy as np
df = group_similar_strings(pd.Series(list_str))
list_group_index = list(df["group_rep_index"])
unique = np.unique(list_group_index)
results = []
for u in unique:
    res = []
    tmp = df[df["group_rep_index"]==u]
    for index, row in df.iterrows():
        res.append(row["group_rep"])
    results.append(res)
    #break
final = []
for gr in results:
    tmp = []
    for x in gr:
        tmp.append(dictionary[x])
    final.append(tmp)
print(final)