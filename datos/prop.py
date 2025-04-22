import csv

# Abre el archivo CSV de entrada
with open('datos/General.csv', 'r') as archivo_entrada:
    # Lee los datos del archivo CSV
    datos = list(csv.reader(archivo_entrada))

    # Agrega la columna "propietario" a los datos
    for i in range(len(datos)):
        if i < 10:
            datos[i].append("Lucas")
        elif i < 20:
            datos[i].append("Santi")
        else:
            datos[i].append("Tomi")

# Abre un nuevo archivo CSV de salida
with open('General.csv', 'w', newline='') as archivo_salida:
    # Escribe los datos en el nuevo archivo CSV
    escritor_csv = csv.writer(archivo_salida)
    escritor_csv.writerows(datos)
