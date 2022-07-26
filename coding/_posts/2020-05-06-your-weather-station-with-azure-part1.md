---
layout: post
title: "Your Weather Station in the Cloud with Azure, Part 1: Requirements and Data Architecture"
date: 2020-05-06
category: coding
---

<div class="my-4 text-center">
  <img class="w-50" src="{{ site.url }}/coding/img/weather_station_azure/p1_azure-iot-architect.png"
  alt="weather_station_data_architecture">
</div>

## Project: Your Home in the Cloud - Weather Monitoring with Azure
[Part 1: Requirements and Data Architecture]({{ site.url }}/coding/your-weather-station-with-azure-part1/) **(We are here)**
<br>
[Part 2: Implementation]({{ site.url }}/coding/your-weather-station-with-azure-part2/)
<br>
[Reference: GitHub Repo](https://github.com/clumdee/pi_azure_iot)

### Motivations
1. Make use of a Raspberry Pi in a storage
2. Get hands-on skill in using cloud platform

### Choose to learn Azure because
1. The most popular choices, together with AWS
2. Recent rise in reputation
3. Microsoft’s breadth might be better for freelancing opportunities

### Requirements:
1. Periodically read temperature/humidity from sensor(s) in the house. <br> This task can be scheduled on a Raspberry Pi.
2. Store temperature/humidity with details of timestamp and sensor_id (location).
3. Display home data in a dashboard

### Some foundations that could be helpful.
- General understanding of cloud computing services
- Overview of Azure services
- Internet-of-Things (IoT)
- Serverless computing -- this project uses Azure Functions
- SQL database -- this project uses Azure SQL Database  
- Data dashboard -- Grafana and Power BI are used here
- Basic Python if you want to understand underlying code

### High-level architect
I propose 3 paths that can accomplish our requirements. Simply based on Azure services that I am interested in playing with. There certainly are many other ways.

All paths start at HOME where a Raspberry Pi collects sensors’ data and sends to Azure. This checks requirement (1).

Note that the HOME part can be simulated using a Raspberry Pi Azure IoT Online Simulator. No physical sensors and Raspberry Pi are needed. Check [https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-raspberry-pi-web-simulator-get-started](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-raspberry-pi-web-simulator-get-started).

<div class="my-4 text-center">
  <img class="w-75" src="{{ site.url }}/coding/img/weather_station_azure/p1_azure-iot-architect.png"
  alt="weather_station_data_architecture">
</div>

#### PATH 1:
Data from HOME directly triggers Azure Functions. This Functions processed the data into a desirable format. It then appends data to a predefined table in Azure SQL Database. Grafana can later read and display a dashboard of the data.

#### PATH 2:
Data from HOME is sent to Azure IoT Hub when it packages a data stream. This data stream then triggers Azure Functions to process and write formatted data to Azure SQL Database. Grafana can later read and display data from the database.

#### PATH 3:
Follow the same steps as in PATH 2 until Azure IoT Hub. Then the data stream goes to Azure Stream Analytics. It can write data to Azure SQL Database which is connected to Grafana. Or it can write data directly to Power BI showing a live dashboard (PATH 3b).

Let’s explore pros and cons of each path.

<table class="table border">
    <thead class="thead-light">
        <tr>
            <th scope="col">PATH</th>
            <th scope="col">PROS</th>
            <th scope="col">CONS</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Most simple for one HOME.</td>
            <td>
                It might not scale well. Since there is no unit for data centralization. <br>
                It will be difficult if we have several HOMEs to manage and monitor. <br>
                I have no idea what will happen if many HOMEs are calling the same Azure Functions.
            </td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>
                Still very simple. <br>
                It takes marginal effort to set up Azure IoT Hub. <br>
                The centralization step makes it possible to keep track and monitor data from several HOMEs. <br>
                It also packages data from different sources to one stream. Creating a clean data flow to Azure
                Functions.
            </td>
            <td>
                You still need an Azure Functions. <br>
                But that’s what I want to learn anyway.
            </td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>
                No coding for data processing needed. Azure Stream Analytics does all the jobs for you. <br>
                It supports several types of data sources and storages, as an input and output. <br>
                As mentioned, it can connect directly to Power BI to display live data.
            </td>
            <td>Azure Stream Analytics is not included in Microsoft’s free tier package.</td>
        </tr>
    </tbody>
</table>


### My choice.
I chose PATH 2 as my long-term implementation. So I will be going through the implementation steps in more detail in the next article.
Anyhow, I would recommend trying all the 3 paths. And other solutions. It was a lot of fun learning these wonderful services.

### End
That concludes the requirements and data architecture of our project. <br>
We will go through the implementation steps in the next post -- [Part 2: Implementation]({{ site.url }}/coding/your-weather-station-with-azure-part2/).
