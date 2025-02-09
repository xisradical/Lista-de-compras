let contadorLinhas=0;function adicionarLinha(){if(500<=contadorLinhas)return void alert("Voc\xEA atingiu o limite m\xE1ximo de 500 itens.");const a=document.getElementById("listaCompras").getElementsByTagName("tbody")[0],b=a.insertRow(),c=b.insertCell(0),d=b.insertCell(1),e=b.insertCell(2),f=b.insertCell(3),g=b.insertCell(4);c.innerHTML=`<input type="text" placeholder="Nome do item">`,d.innerHTML=`<input type="number" min="1" value="1" oninput="calcularTotais()">`,e.innerHTML=`<input type="number" step="0.01" min="0" value="0.00" oninput="calcularTotais()">`,f.innerHTML=`<span>R$ 0.00</span>`,g.innerHTML=`<button class="remove-btn" onclick="removerLinha(this)">Remover</button>`,contadorLinhas++,calcularTotais()}function calcularTotais(){const a=document.getElementById("listaCompras").getElementsByTagName("tbody")[0].rows;let b=0;for(let c=0;c<a.length;c++){const d=parseFloat(a[c].cells[1].querySelector("input").value)||0,e=parseFloat(a[c].cells[2].querySelector("input").value)||0,f=d*e;a[c].cells[3].querySelector("span").textContent=`R$ ${f.toFixed(2)}`,b+=f}document.getElementById("totalGeral").textContent=`R$ ${b.toFixed(2)}`,calcularDisponivel()}function calcularDisponivel(){const a=parseFloat(document.getElementById("valorTotalGasto").value)||0,b=parseFloat(document.getElementById("totalGeral").textContent.replace("R$ ",""))||0;document.getElementById("valorDisponivel").textContent=`R$ ${(a-b).toFixed(2)}`}function salvarCompra(){const a=document.getElementById("dataCompra").value,b=parseFloat(document.getElementById("valorTotalGasto").value)||0,c=parseFloat(document.getElementById("totalGeral").textContent.replace("R$ ",""))||0;if(!a)return void alert("Por favor, selecione uma data para a compra.");let d=JSON.parse(localStorage.getItem("historicoCompras"))||[];d.push({data:a,valorTotalGasto:b,totalGeral:c,diferenca:b-c}),localStorage.setItem("historicoCompras",JSON.stringify(d)),alert("Compra salva com sucesso!"),carregarHistorico()}function carregarHistorico(){const a=JSON.parse(localStorage.getItem("historicoCompras"))||[],b=document.getElementById("historicoCompras").getElementsByTagName("tbody")[0];b.innerHTML="",a.forEach((a,c)=>{const d=b.insertRow(),e=d.insertCell(0),f=d.insertCell(1),g=d.insertCell(2),h=d.insertCell(3),i=d.insertCell(4);e.textContent=a.data||"N/A",f.textContent=`R$ ${(a.valorTotalGasto||0).toFixed(2)}`,g.textContent=`R$ ${(a.totalGeral||0).toFixed(2)}`,h.textContent=`R$ ${(a.diferenca||0).toFixed(2)}`,i.innerHTML=`<button class="remove-btn" onclick="removerRelatorio(${c})">Remover</button>`})}function filtrarHistorico(){const a=document.getElementById("filtroData").value,b=JSON.parse(localStorage.getItem("historicoCompras"))||[],c=document.getElementById("historicoCompras").getElementsByTagName("tbody")[0];c.innerHTML="";const d=b.filter(b=>b.data===a);d.forEach((a,b)=>{const d=c.insertRow(),e=d.insertCell(0),f=d.insertCell(1),g=d.insertCell(2),h=d.insertCell(3),i=d.insertCell(4);e.textContent=a.data||"N/A",f.textContent=`R$ ${(a.valorTotalGasto||0).toFixed(2)}`,g.textContent=`R$ ${(a.totalGeral||0).toFixed(2)}`,h.textContent=`R$ ${(a.diferenca||0).toFixed(2)}`,i.innerHTML=`<button class="remove-btn" onclick="removerRelatorio(${b})">Remover</button>`})}function limparHistorico(){confirm("Tem certeza que deseja limpar todo o hist\xF3rico?")&&(localStorage.removeItem("historicoCompras"),carregarHistorico())}function removerRelatorio(a){let b=JSON.parse(localStorage.getItem("historicoCompras"))||[];b.splice(a,1),localStorage.setItem("historicoCompras",JSON.stringify(b)),carregarHistorico()}function removerLinha(a){const b=a.parentElement.parentElement;b.remove(),calcularTotais()}function exportarParaExcel(){const a=document.getElementById("listaCompras"),b=a.getElementsByTagName("tbody")[0].rows,c=[];c.push(["Nome do Item","Quantidade","Pre\xE7o Unit\xE1rio (R$)","Total por Item (R$)"]);for(let a=0;a<b.length;a++){const d=b[a].cells[0].querySelector("input").value||"",e=b[a].cells[1].querySelector("input").value||0,f=b[a].cells[2].querySelector("input").value||0,g=b[a].cells[3].querySelector("span").textContent.replace("R$ ","")||0;c.push([d,e,f,g])}const d=XLSX.utils.book_new(),e=XLSX.utils.aoa_to_sheet(c);XLSX.utils.book_append_sheet(d,e,"Lista de Compras"),XLSX.writeFile(d,"lista_de_compras.xlsx")}carregarHistorico(),adicionarLinha();