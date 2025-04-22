import pandas as pd

try:
    # Read the CSV file into a DataFrame
    data = pd.read_csv('datos/Tomi.csv')
    
    # Calculate the average values
    danceability_avg = data['danceability'].mean()
    energy_avg = data['energy'].mean()
    popularity_avg = data['popularity'].mean()
    tempo_avg = data['tempo'].mean()
    instrumentalness_avg = data['instrumentalness'].mean()
    valence_avg = data['valence'].mean()
    acousticness_avg = data['acousticness'].mean()
    key_avg = data['key'].mean()

    # Print the average values
    print("Average Danceability:", danceability_avg)
    print("Average Energy:", energy_avg)
    print("Average Popularity:", popularity_avg)
    print("Average Tempo:", tempo_avg)
    print("Average Instrumentalness:", instrumentalness_avg)
    print("Average Valence:", valence_avg)
    print("Average Acousticness:", acousticness_avg)
    print("Average Key:", key_avg)

except FileNotFoundError:
    print("File not found. Please provide the correct file path.")

