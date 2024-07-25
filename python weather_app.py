import tkinter as tk
from tkinter import messagebox

import requests


# Function to get weather data
def get_weather(city):
    api_key = "a1652e133809826e85c1055989e88075"
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    complete_url = base_url + "appid=" + api_key + "&q=" + city
    response = requests.get(complete_url)
    data = response.json()
    return data

# Function to display weather
def show_weather():
    city = city_entry.get()
    weather_data = get_weather(city)
    
    if weather_data['cod'] == 200:
        main = weather_data['main']
        wind = weather_data['wind']
        weather_desc = weather_data['weather'][0]['description']
        
        temperature_celsius = main['temp'] - 273.15  # Convert from Kelvin to Celsius
        temperature_fahrenheit = (temperature_celsius * 9/5) + 32  # Convert from Celsius to Fahrenheit
        pressure = main['pressure']
        humidity = main['humidity']
        wind_speed = wind['speed']
        
        weather_info = f"Temperature: {temperature_fahrenheit:.2f}°F\n"
        weather_info += f"Pressure: {pressure} hPa\n"
        weather_info += f"Humidity: {humidity}%\n"
        weather_info += f"Wind Speed: {wind_speed} m/s\n"
        weather_info += f"Description: {weather_desc}"
        
        messagebox.showinfo("Weather Info", weather_info)
    else:
        messagebox.showerror("Error", "City not found")

# Create GUI
root = tk.Tk()
root.title("Weather App")

city_label = tk.Label(root, text="City:")
city_label.pack(pady=10)

city_entry = tk.Entry(root)
city_entry.pack(pady=5)

get_weather_button = tk.Button(root, text="Get Weather", command=show_weather)
get_weather_button.pack(pady=20)

root.mainloop()
