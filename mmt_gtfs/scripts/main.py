import pandas as pd
from glob import glob

for file_path in glob("../csv/*.csv"):
    print(file_path)

    df = pd.read_csv(file_path)
    df.to_json(file_path.replace("csv", "json"), orient="records")