from model.responses import Response
import asyncio
from fastapi import HTTPException
from typing import List
import pandas as pd
import numpy as np
from string_grouper import match_strings, match_most_similar, \
	group_similar_strings, compute_pairwise_similarities, \
	StringGrouper
class SummaryService:
    def __init__(self,):
        pass
    async def summary(self,list_object:list):# [a,b,c,d,e] -> [[a],[b,c],[d,e]]
        ###
        ###
        dictionary = {}
        list_str = []
        for obj in list_object:
            obj["title"]= obj["title"].lower().replace("hk","học kỳ").replace("kì","kỳ")
            dictionary[obj["title"].lower()] = obj
            list_str.append(obj["title"].lower())
        import numpy as np
        df = group_similar_strings(pd.Series(list_str))
        
        list_group_index = list(df["group_rep_index"])
        unique = np.unique(list_group_index)
        #print(unique)
        results = []
        for u in unique:
            res = []
            tmp = df[df["group_rep_index"]==u]
            for index, row in tmp.iterrows():
                res.append(row["group_rep"])
            results.append(res)
            #break
        final = []
        for gr in results:
            tmp = []
            for x in gr:
                tmp.append(dictionary[x])
            final.append(tmp)
        return final
