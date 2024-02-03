import pandas as pd
import numpy as np
import math
import re
from collections import Counter
import os

# Mendapatkan path saat ini
current_path = os.getcwd()

# Menambahkan path baru
new_path = os.path.join(current_path, 'cluster/informationRetrieval/clt_ir.csv')
new_path_bpom = os.path.join(current_path, 'cluster/informationRetrieval/bpom_fixed.csv')
new_path_halodoc = os.path.join(current_path, 'cluster/informationRetrieval/data_halodoc_fixed.csv')


data_ag = pd.read_csv(new_path)
bpom = pd.read_csv(new_path_bpom)
halodoc = pd.read_csv(new_path_halodoc)


data_ag = data_ag[["nomor_registrasi", "produk", "nama_produk", "bentuk_sediaan", "komposisi", "klaim", "summary", "cluster"]]
bpom = bpom[["nomor_registrasi", "tanggal_terbit", "masa_berlaku_s/d", "diterbitkan_oleh", "pendaftar", "diproduksi_oleh", 'pemberi_lisensi', 'pemberi_kontrak', 'penerima_kontrak', 'penerima_kontrak.1', 'pabrik', 'pabrik.1', 'pengemas_sekunder', 'pengemas_keduanya']]
halodoc = halodoc[["Aturan Pakai", "Deskripsi", "Dosis", "Efek Samping", "Golongan Produk", "Kontra Indikasi", "Manufaktur", "Perhatian", "nomor_registrasi"]]



data = pd.merge(data_ag, bpom, on = "nomor_registrasi", how = "left")
data = pd.merge(data, halodoc, on = "nomor_registrasi", how = "left")


WORD = re.compile(r"\w+")


data = data.drop_duplicates().reset_index()

data_clt = data_ag[["summary", "cluster"]]
grouped_df = data_clt.groupby("cluster").agg({"summary": lambda x: ' '.join(x)}).reset_index()

def get_cosine(vec1, vec2):
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])

    sum1 = sum([vec1[x] ** 2 for x in list(vec1.keys())])
    sum2 = sum([vec2[x] ** 2 for x in list(vec2.keys())])
    denominator = math.sqrt(sum1) * math.sqrt(sum2)

    if not denominator:
        return 0.0
    else:
        return float(numerator) / denominator


def text_to_vector(text):
    words = WORD.findall(text)
    return Counter(words)

def remove_punctuation(text):
    return re.sub(r'[^\w\s]', '', text)

def get_top_data(query):
  vector_query = text_to_vector(query)
  cosine_list = []
  summaries = grouped_df["summary"].tolist()
  for summary in summaries:
      summary = remove_punctuation(summary)
      vector_summary = text_to_vector(summary)
      cosine = get_cosine(vector_query, vector_summary)
      cosine_list.append(cosine)
  max_values_index = cosine_list.index(max(cosine_list))
  cluster_index = grouped_df["cluster"].loc[max_values_index]
  cosine_clt = []
  summaries_clt = data["summary"].loc[data["cluster"] == cluster_index]
  for summary in summaries_clt:
    summary = remove_punctuation(summary)
    vector_summary = text_to_vector(summary)
    cosine = get_cosine(vector_query, vector_summary)
    cosine_clt.append(cosine)
  top = data[data["cluster"] == cluster_index].assign(cosine=cosine_clt).sort_values(by='cosine', ascending=False)
  return top
