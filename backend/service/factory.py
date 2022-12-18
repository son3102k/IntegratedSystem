from .ToanMathService import ToanMathService
from .OnluyenService import OnluyenService
from .TracNghiemService import TracNghiemService
from .ThuVienDeThiService import ThuVienDeThiService
FACTORY = {"toanmath":ToanMathService,
           "onluyen":OnluyenService,
           "tracnghiem":TracNghiemService,
           "thuviendethi":ThuVienDeThiService}