import { Component } from '@angular/core';
import { ViacepService } from '../services/viacep.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage {
  cep: string = '';
  endereco: any = {};

  constructor(private viacepService: ViacepService) { }

  buscarEndereco() {
    this.viacepService.buscarEndereco(this.cep).subscribe(data => {
      // Armazena todos os dados retornados pela API no objeto 'endereco'
      this.endereco = {
        logradouro: data.logradouro,
        complemento: data.complemento,
        unidade: data.unidade,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        regiao: this.getRegiao(data.uf),  // Regra para mapear a região
        ibge: data.ibge,
        gia: data.gia,
        ddd: data.ddd,
        siafi: data.siafi
      };
    });
  }

  // Função auxiliar para mapear estados para regiões
  getRegiao(uf: string): string {
    const regioes: any = {
      'RJ': 'Sudeste',
      'SP': 'Sudeste',
      'MG': 'Sudeste',
      'ES': 'Sudeste',
      'PR': 'Sul',
      'SC': 'Sul',
      'RS': 'Sul',
      // Adicionar outros estados e regiões
    };
    return regioes[uf] || 'Desconhecida';
  }
}
