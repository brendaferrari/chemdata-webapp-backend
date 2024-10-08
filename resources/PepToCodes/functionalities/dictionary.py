import pandas as pd
import json


class Dictionary:
    """ A class that represents the dictionary functionalities.

    Method:
        Dict(self, one_code=False, three_code=False): Return the full dictionary with all data regards aminoacids on the database.
    """

    def dict_csv(self, code):
        """Return the full dictionary with all data regards aminoacids on the database.

        Arguments:
            one_code=False(boolean): Default is False. If true returns the one letter code of aminoacids
            three_code=False(boolean): Default is False. If true returns the three letter code of aminoacids
        """

        if code == "one letter code":
            codes_db = pd.read_csv("resources/PepToCodes/resources/codes.csv", sep=' ', names=['name', 'smiles', '3lcode', '1lcode'], 
                        usecols= ['smiles', '1lcode'], index_col=0, header=None).squeeze("columns")  
            dictio_db = codes_db.to_dict()      
        
        elif code == "three letter code":
            codes_db = pd.read_csv("resources/PepToCodes/resources/codes.csv", sep=' ', names=['name', 'smiles', '3lcode', '1lcode'], 
                        usecols= ['smiles', '3lcode'], index_col=0, header=None).squeeze("columns")
            dictio_db = codes_db.to_dict()         

        return dictio_db

    def dict_json(self, canonical=True, isomeric=False):
        """Return the full dictionary with all data regards aminoacids on norineDB database.

        Arguments:
            canonical=True(boolean): Default. If true returns a dictionary with norine database for canonical smiles.
            isomeric=False(boolean): IN DEVELOPMENT 
        """

        if canonical is True:
            with open("resources/PepToCodes/resources/norineDB.json", "r") as r:
                data = json.load(r)

                canonicalSmiles = []
                codeCan = []
                n = 0

                while n < 544:
                    dataCodeCan = data[n]['code']
                    dataCanonical = data[n]['smiles']

                    codeCan.append(dataCodeCan)
                    canonicalSmiles.append(dataCanonical)
                    
                    n += 1
                
                dictio = dict(zip(canonicalSmiles, codeCan))

        if isomeric is True:
            with open("resources/norineDB.json", "r") as r:
                data = json.load(r)

                isomericSmiles = []
                codeIso = []
                n = 0

                while n < 544:

                    if 'isomeric' in data[n]:
                        dataCodeIso = data[n]['code']
                        dataIsomeric = data[n]['isomeric']
                        
                        codeIso.append(dataCodeIso)
                        isomericSmiles.append(dataIsomeric)
                    
                    n += 1
                
                dictio = dict(zip(isomericSmiles, codeIso))

        return dictio

