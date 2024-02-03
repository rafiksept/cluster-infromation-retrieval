from django.shortcuts import render, redirect
import pandas as pd
from django.http import JsonResponse
from django.contrib.staticfiles.finders import find
import json
import re
from cluster.informationRetrieval import ir

def index(request):
    return render(request, 'cluster/cluster.html')


def result(request):
    if request.method == "POST" :
        name = request.POST['searchUser']
        return render(request, "cluster/result.html", {"name" :name})
    else :
        return redirect("/")
    
def remove_symbol(input_string):
    # Hapus semua karakter yang tidak bisa diformatkan sebagai JSON
    cleaned_string = re.sub(r'[^\x20-\x7E]', '', input_string)
    return cleaned_string

def clean_string_for_json(list_data):
    indikasi_clean = []

    for i in list_data:
        if isinstance(i, str) and i.strip() != "" and i.strip() != "-":
            indikasi_clean.append(remove_symbol(i))
        else:
            indikasi_clean.append("Tidak ada informasi")
    return indikasi_clean


def getDrugName(request, name):
    if request.method == "GET" :
        # static_file_path = find('cluster/data/spectral.csv')
        # df = pd.read_csv(static_file_path)
        # df = df.fillna("Tidak ada informasi")

        hasil = ir.get_top_data(name)
        # cluster_df = df[df['name'] == name]
        if len(hasil) > 0 :
            # cluster = cluster_df.iloc[0]["cluster"]
            # df_cluster = df[df["cluster"] == cluster]
            name_cluster = hasil["nama_produk"].to_list() 
            bentuk_sediaan_cluster = hasil["bentuk_sediaan"].to_list() 
            klaim_cluster = hasil["klaim"].to_list() 
            tanggal_terbit_cluster = hasil["tanggal_terbit"].to_list() 
            masa_berlaku_sd_cluster = hasil["masa_berlaku_s/d"].to_list() 
            diterbitkan_oleh_cluster = hasil["diterbitkan_oleh"].to_list() 
            pendaftar_cluster = hasil["pendaftar"].to_list() 
            komposisi_cluster = hasil["komposisi"].to_list() 
            aturan_cluster = hasil["Aturan Pakai"].to_list() 
            deksripsi_cluster = hasil["Deskripsi"].to_list() 
            dosis_cluster = hasil["Dosis"].to_list() 
            efek_samping_cluster = hasil["Efek Samping"].to_list() 
            golongan_produk_cluster = hasil["Golongan Produk"].to_list() 
            kontra_cluster = hasil["Kontra Indikasi"].to_list() 
            perhatian_cluster = hasil["Perhatian"].to_list() 
            manufaktur_cluster = hasil["Manufaktur"].to_list() 
            no_cluster = hasil["nomor_registrasi"].to_list() 

           
            data = {
                "name": name_cluster,
                "aturan" : clean_string_for_json(aturan_cluster),
                "komposisi" : clean_string_for_json(komposisi_cluster),
                "dosis" : clean_string_for_json(dosis_cluster),
                "kontra" : clean_string_for_json(kontra_cluster),
                "perhatian" : clean_string_for_json(perhatian_cluster),
                "bentuk_sediaan" : clean_string_for_json(bentuk_sediaan_cluster),
                "klaim" : clean_string_for_json(klaim_cluster),
                "masa_berlaku_sd" : clean_string_for_json(masa_berlaku_sd_cluster),
                "diterbitkan_oleh" : clean_string_for_json(diterbitkan_oleh_cluster),
                "tanggal_terbit" : clean_string_for_json(tanggal_terbit_cluster),
                "pendaftar" : clean_string_for_json(pendaftar_cluster),
                "deksripsi" : clean_string_for_json(deksripsi_cluster),
                "efek_samping" : clean_string_for_json( efek_samping_cluster),
                "golongan_produk" : clean_string_for_json(golongan_produk_cluster),
                "manufaktur" : clean_string_for_json(manufaktur_cluster),
                "no" : clean_string_for_json(no_cluster),
                
            }
                    
            return JsonResponse(json.dumps(data), safe=False)
        else :
            return JsonResponse({"name" : []})