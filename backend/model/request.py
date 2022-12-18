from typing import Dict, List, Optional
from pydantic import BaseModel
from enum import Enum

class Type(str,Enum):
    MidHK1 ="MidHK1"
    MidHK2 = "MidHK2"
    HK1 = "HK1"
    HK2 =  "HK2"
    Try = "Try"
    HSG = "HSG"

class Subject(str,Enum):
    MATH = "MATH"
    PHYSIC = "PHYSIC"
    CHEMISTRY = "CHEMISTRY"
    BIOLOGY = "BIOLOGY"


class RequestSearch(BaseModel):
    type:Optional[Type] = None
    subject:Optional[Subject] = None # 
    grade:Optional[str] = None # 1-2-3-4-5-6-7-8-9-10-11-12
    level:Optional[str ]= None # 1-2-3
    text:Optional[str]=None
    page:int = 1
    