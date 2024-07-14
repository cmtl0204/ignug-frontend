import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {
  genderData: any;
  ethnicityData: any;
  ageData: any;
  civilStatusData: any;
  chartOptions: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Datos para el gráfico de "Sexo (Género)"
    this.genderData = {
      labels: ['Male', 'Female', 'Other'],
      datasets: [
        {
          label: 'Genders',
          data: [300, 500, 100],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)'],
          borderWidth: 1
        }
      ]
    };

    // Datos para el gráfico de "Etnias"
    this.ethnicityData = {
      labels: ['Afro-descendiente', 'Indígena', 'Mestizo', 'Blanco', 'Otros'],
      datasets: [
        {
          label: 'Ethnicities',
          data: [200, 150, 400, 100, 50],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(255, 99, 132)'],
          borderWidth: 1
        }
      ]
    };

    // Datos para el gráfico de "Edades"
    this.ageData = {
      labels: ['15-25', '26-35', '36-45', '46-55', '56-65', '66-70'],
      datasets: [
        {
          label: 'Ages',
          data: [100, 150, 200, 250, 150, 100],
          backgroundColor: ['rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgb(255, 159, 64)'],
          borderWidth: 1
        }
      ]
    };

    // Datos para el gráfico de "Estado Civil"
    this.civilStatusData = {
      labels: ['Soltero', 'Casado', 'Divorciado', 'Viudo'],
      datasets: [
        {
          data: [400, 300, 150, 50],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#FF8A65']
        }
      ]
    };

    // Opciones de configuración para los gráficos
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}
