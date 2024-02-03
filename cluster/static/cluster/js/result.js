// const itemDrug = document.querySelectorAll(".item-drug");

// itemDrug.forEach(e => {
//     e.addEventListener("click", function () {
//         console.log("klikItem");
//         let detailInformation = e.querySelector(".detail-information");
//         let indikasiUmum = e.querySelector(".indikasi-umum");
//         if (e.classList.contains("open-drug")) {
//             detailInformation.classList.remove("hidden");   
//             let indikasiDesc = `
//             Untuk pengobatan konstipasi pada pasien dengan konstipasi kronis Untuk portal systemic encephalopathy termasuk keadaan pre koma hepatik & koma hepatic
//             `
//             indikasiUmum.innerHTML = indikasiDesc
//             e.classList.remove("open-drug");
           
//         } else {
//             detailInformation.classList.add("hidden");   
//             e.classList.add("open-drug");
//             let indikasiDesc = `
//             Untuk pengobatan konstipasi pada pasien dengan konstipasi kronis Untuk portal systemic encephalopathy termasuk keadaan pre koma hepatik & koma hepatic.....<span class="font-semibold text-green-500">Lebih Lanjut</spam>
//             `
//             indikasiUmum.innerHTML = indikasiDesc
//             // e.style.animation = "myAnimation 2s forwards"
//         }
//     })
// })


// Contoh data yang akan dikirim
const inputName = document.querySelector(".title-name");
const hasilCluster = document.querySelector(".hasil-cluster");
const containerSearch = document.querySelector(".search-container-obat");
const url = `https://information-drug-data.azurewebsites.net/getDataDrug/${inputName.innerText}`;

// Konfigurasi objek untuk request
const requestOptions = {
method: 'GET',
headers: {
    'Content-Type': 'application/json' // Set tipe konten sebagai JSON
    // Anda juga bisa menambahkan header lain sesuai kebutuhan
},
};

// Lakukan POST request menggunakan fetch()
fetch(url, requestOptions)
.then(response => {
    if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json(); // Konversi respons ke JSON
})
.then(data => {
    let dataDrug = JSON.parse(data)
    hasilCluster.innerHTML = `${dataDrug["name"].length} Obat Ditemukan`

    const loadMore = document.querySelector(".load-more")
    if (dataDrug["name"].length == 0) {
        loadMore.classList.add("hidden")
    } else {
        loadMore.classList.remove("hidden")
    }

    min_ambil = 0

    
    for (let index = 0;  index < 20; index++) {
        dekspripsi = dataDrug["klaim"][index]
        containerDrug = `
        <div class="item-drug bg-white rounded-lg drop-shadow-sm w-[580px] my-2 mx-3 p-5 h-min open-drug">
        <h5 class="font-semibold text-base">${dataDrug["name"][index]}</h5>
        <p class="text-sm bg-green-200 w-min text-green-500 px-3 mt-1 font-medium rounded-lg">Obat</p>
        <p class="mt-1 text-sm deksripsi-umum">${dekspripsi.substring(0, 200)}.....<span class="font-semibold text-green-500">Lebih Lanjut</spam></p>
        <div class="detail-information hidden">
            <h6 class="font-medium text-sm mt-3">Deskripsi</h6>
            <p class="mt-1 text-sm">
            ${dataDrug["deksripsi"][index]}
            </p>
            <h6 class="font-medium text-sm mt-3">Aturan Pakai</h6>
            <p class="mt-1 text-sm">${dataDrug["aturan"][index]}
            </p>
            <h6 class="font-medium text-sm mt-3">Komposisi</h6>
            <p class="mt-1 text-sm">${dataDrug["komposisi"][index]}
            </p>
            <h6 class="font-medium text-sm mt-3">Dosis</h6>
            <p class="mt-1 text-sm">
                  ${dataDrug["dosis"][index]}
            </p>
            <h6 class="font-medium text-sm mt-3">Kontra Indikasi</h6>
            <p class="mt-1 text-sm">
            ${dataDrug["kontra"][index]}
            </p>
            <h6 class="font-medium text-sm mt-3">Perhatian</h6>
            <p class="mt-1 text-sm">
            ${dataDrug["perhatian"][index]}
            </p>
            <h6 class="font-medium text-sm mt-3">Bentuk Sediaan</h6>
            <p class="mt-1 text-sm">
            ${dataDrug["bentuk_sediaan"][index]}
            </p>
            
            <h6 class="font-medium text-sm mt-3">Diterbitkan Oleh</h6>
            <p class="mt-1 text-sm">
            ${dataDrug["diterbitkan_oleh"][index]}
            </p>
            <h6 class="font-medium text-sm mt-3">Pendaftar</h6>
            <p class="mt-1 text-sm">
            ${dataDrug["pendaftar"][index]}
            </p>
            <h6 class="font-medium text-sm mt-3">Efek Samping</h6>
            <p class="mt-1 text-sm">
            ${dataDrug["efek_samping"][index]}
            </p>


            <div class="relative overflow-x-auto sm:rounded-lg mt-5">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Detail
                            </th>
                            <th scope="col" class="px-6 py-3">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Nomor Registrasi
                            </th>
                            <td class="px-6 py-4 text-center">
                            ${dataDrug["no"][index]}
                            </td>
                        </tr>
                       
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Masa Berlaku
                            </th>
                            <td class="px-6 py-4 text-center">
                            ${dataDrug["masa_berlaku_sd"][index]}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Tanggal Terbit
                            </th>
                            <td class="px-6 py-4 text-center">
                            ${dataDrug["tanggal_terbit"][index]}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Golongan Produk
                            </th>
                            <td class="px-6 py-4 text-center">
                            ${dataDrug["golongan_produk"][index]}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Manufaktur
                            </th>
                            <td class="px-6 py-4 text-center">
                            ${dataDrug["manufaktur"][index]}
                            </td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
            <p class= "mt-4 text-xs ">sumber : <a href="https://cekbpom.pom.go.id/" class="font-semibold text-blue-600">BPOM</a> dan <a href="https://www.halodoc.com/obat-dan-vitamin" class="font-semibold text-blue-600">Halodoc</a></p>
        </div>
    </div>
        `
        let newChildElement = document.createElement('div');
        newChildElement.innerHTML = containerDrug;
    
        containerSearch.appendChild(newChildElement)
    }

    const itemDrug = document.querySelectorAll(".item-drug");


    for (let index = 0; index < min_ambil + 20; index++) {
        itemDrug[index].addEventListener("click", function () {
            
            let detailInformation = itemDrug[index].querySelector(".detail-information");
            let indikasiUmum = itemDrug[index].querySelector(".deksripsi-umum");
            if (itemDrug[index].classList.contains("open-drug")) {
                detailInformation.classList.remove("hidden");   
                let indikasiDesc = `
                ${dataDrug["klaim"][index]}
                `
                indikasiUmum.innerHTML = indikasiDesc
                itemDrug[index].classList.remove("open-drug");
               

            } else {
                detailInformation.classList.add("hidden");   
                itemDrug[index].classList.add("open-drug");
                let indikasiDesc = `
                ${dataDrug["klaim"][index].substring(0,200)}.....<span class="font-semibold text-green-500">Lebih Lanjut</spam>
                `
                indikasiUmum.innerHTML = indikasiDesc
                // e.style.animation = "myAnimation 2s forwards"
            }
        })
        
    }

    min_ambil = min_ambil + 20;

    loadMore.addEventListener("click", function () {
        
        for (let index = min_ambil;  index < min_ambil + 20; index++) {
            if (index >= dataDrug["name"].length) {
                loadMore.classList.add("hidden")
                break
            } 
            dekspripsi = dataDrug["klaim"][index]
            containerDrug = `
            <div class="item-drug bg-white rounded-lg drop-shadow-sm w-[580px] my-2 mx-3 p-5 h-min open-drug">
            <h5 class="font-semibold text-base">${dataDrug["name"][index]}</h5>
            <p class="text-sm bg-green-200 w-min text-green-500 px-3 mt-1 font-medium rounded-lg">Obat</p>
            <p class="mt-1 text-sm deksripsi-umum">${dekspripsi.substring(0, 200)}.....<span class="font-semibold text-green-500">Lebih Lanjut</spam></p>
            <div class="detail-information hidden">
                <h6 class="font-medium text-sm mt-3">Deskripsi</h6>
                <p class="mt-1 text-sm">
                ${dataDrug["deksripsi"][index]}
                </p>
                <h6 class="font-medium text-sm mt-3">Aturan Pakai</h6>
                <p class="mt-1 text-sm">${dataDrug["aturan"][index]}
                </p>
                <h6 class="font-medium text-sm mt-3">Komposisi</h6>
                <p class="mt-1 text-sm">${dataDrug["komposisi"][index]}
                </p>
                <h6 class="font-medium text-sm mt-3">Dosis</h6>
                <p class="mt-1 text-sm">
                      ${dataDrug["dosis"][index]}
                </p>
                <h6 class="font-medium text-sm mt-3">Kontra Indikasi</h6>
                <p class="mt-1 text-sm">
                ${dataDrug["kontra"][index]}
                </p>
                <h6 class="font-medium text-sm mt-3">Perhatian</h6>
                <p class="mt-1 text-sm">
                ${dataDrug["perhatian"][index]}
                </p>
                <h6 class="font-medium text-sm mt-3">Bentuk Sediaan</h6>
                <p class="mt-1 text-sm">
                ${dataDrug["bentuk_sediaan"][index]}
                </p>
                <h6 class="font-medium text-sm mt-3">Diterbitkan Oleh</h6>
                <p class="mt-1 text-sm">
                ${dataDrug["diterbitkan_oleh"][index]}
                </p>
                <h6 class="font-medium text-sm mt-3">Pendaftar</h6>
                <p class="mt-1 text-sm">
                ${dataDrug["pendaftar"][index]}
                </p>
                <h6 class="font-medium text-sm mt-3">Efek Samping</h6>
                <p class="mt-1 text-sm">
                ${dataDrug["efek_samping"][index]}
                </p>
    
    
                <div class="relative overflow-x-auto sm:rounded-lg mt-5">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Detail
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Nomor Registrasi
                                </th>
                                <td class="px-6 py-4 text-center">
                                ${dataDrug["no"][index]}
                                </td>
                            </tr>
                           
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Masa Berlaku
                                </th>
                                <td class="px-6 py-4 text-center">
                                ${dataDrug["masa_berlaku_sd"][index]}
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Tanggal Terbit
                                </th>
                                <td class="px-6 py-4 text-center">
                                ${dataDrug["tanggal_terbit"][index]}
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Golongan Produk
                                </th>
                                <td class="px-6 py-4 text-center">
                                ${dataDrug["golongan_produk"][index]}
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Manufaktur
                                </th>
                                <td class="px-6 py-4 text-center">
                                ${dataDrug["manufaktur"][index]}
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
                <p class= "mt-4 text-xs ">sumber : <a href="https://cekbpom.pom.go.id/" class="font-semibold text-blue-600">BPOM</a> dan <a href="https://www.halodoc.com/obat-dan-vitamin" class="font-semibold text-blue-600">Halodoc</a></p>
            </div>
        </div>
            `
            let newChildElement = document.createElement('div');
            newChildElement.innerHTML = containerDrug;
        
            containerSearch.appendChild(newChildElement)
        }
    
        const itemDrug = document.querySelectorAll(".item-drug");
    
        
    
        for (let index = min_ambil; index < itemDrug.length; index++) {
            
            itemDrug[index].addEventListener("click", function () {
                
                let detailInformation = itemDrug[index].querySelector(".detail-information");
                let indikasiUmum = itemDrug[index].querySelector(".deksripsi-umum");
                if (itemDrug[index].classList.contains("open-drug")) {
                    console.log("ada open drug");
                    detailInformation.classList.remove("hidden");   
                    let indikasiDesc = `
                    ${dataDrug["klaim"][index]}
                    `
                    indikasiUmum.innerHTML = indikasiDesc
                    itemDrug[index].classList.remove("open-drug");
                   
                } else {
                    detailInformation.classList.add("hidden");   
                    itemDrug[index].classList.add("open-drug");
                    let indikasiDesc = `
                    ${dataDrug["klaim"][index].substring(0,200)}.....<span class="font-semibold text-green-500">Lebih Lanjut</spam>
                    `
                    indikasiUmum.innerHTML = indikasiDesc
                    // e.style.animation = "myAnimation 2s forwards"
                }
            })
            
        }

        min_ambil = min_ambil + 20;
    })    
})
.catch(error => {
    const loadMore = document.querySelector(".load-more")
    loadMore.classList.add("hidden")
    console.error('Terjadi kesalahan:', error);
});

