import plotly.offline as py
from plotly.graph_objs import *

import colorlover as cl
import numpy as np

# ============
def colorscale(colorPalette, color_step):
    color_scale = cl.scales['3']['div'][colorPalette]
    color_scale = cl.interp( color_scale, color_step)

    # create a list of pairs of (value, color) to map to a colorbar -- value in [0,0.2,0.4,0.6,0.8,1]
    colorbar_scale = [[i/100, color] for i, color in 
                          zip(range(0,101,20),color_scale[0::int(len(color_scale)/5)]+[color_scale[-1]])]
    
    return color_scale, colorbar_scale

# ============
def gen_colorbar(plot_data, mock_location, cbar_x, cbar_y, colorbarname, cbar_type, colorscale, vmin, vmax, tickvals=None, ticktext=None):
    
    if cbar_type=='log':
        vmin, vmax = np.log10([vmin, vmax])
    colorbar = dict(len=0.4,x=cbar_x,y=cbar_y,thickness=20,title=colorbarname,titleside='top',
                    tickvals=tickvals,ticktext=ticktext)
        
    dummy_trace=dict(
                type='scatter',
                x=mock_location[0],
                y=mock_location[1],
                mode='markers',
                showlegend = False,
                marker=dict(size=0.1, color=[vmin, vmax], 
                         colorscale=colorscale,
                         showscale=True,
                         colorbar = colorbar
                        ),
                hoverinfo='none'
                )
    plot_data.append(dummy_trace)
    
# ============
def plot_outline(plot_data, polygon, simplify_factor, fillcolor):
    x,y = polygon.simplify(simplify_factor).exterior.xy
    outline = dict(
                    type = 'scatter',
                    showlegend = False,
                    name = 'Name to display when showlegend=True',
                    mode = 'lines',
#                     legendgroup = "province",
                    line = dict(color='black', width=1),
                    x=x,
                    y=y,
                    fill='toself',
                    fillcolor = fillcolor,
                    hoverinfo='none'
                )
    plot_data.append(outline)
    
# ============
def plot_location(plot_data, row, row_dataCol, fillcolor, max_value):
    
    c_x,c_y = row.geometry.centroid.xy
    hover_bgcolor = fillcolor.split('%')[0]+'%, '+str(float(fillcolor.split('%')[1][2:])+20)+'%'+fillcolor.split('%')[2]
    
    if max_value >= 1e9:
        hover_text = '{}:<br>'.format(row.Province)+'{:.2f}B'.format(row[row_dataCol]/1e9) 
    elif max_value >= 1e6:
        hover_text = '{}:<br>'.format(row.Province)+'{:.2f}M'.format(row[row_dataCol]/1e6)
    elif max_value >= 1e3:
        hover_text = '{}:<br>'.format(row.Province)+'{:.2f}k'.format(row[row_dataCol]/1e3)
    else: hover_text = '{}:<br>'.format(row.Province)+'{:.2f}'.format(row[row_dataCol])
    
    hover_point = dict(
                        type = 'scatter',
                        showlegend = False,
#                         legendgroup = "centroids",
                        name = row['Province'],
                        marker = dict(size=2, color='black'),
                        x=c_x,
                        y=c_y,
                        hoverinfo='text',
                        text = hover_text,
                        hoverlabel = dict(bgcolor=hover_bgcolor)
                    )
    plot_data.append(hover_point)
    
# ============   
def gen_map(plot_data, map_df, dataCol, simplify_factor=0, cbar_x=None, cbar_y=None, cbar_type='linear', 
            cbar_tickvals=None, cbar_ticktext=None, colorbarname=None):
    
    # set min_value and max_value
    min_value = map_df[dataCol].min() # sometimes set to 0
    max_value = map_df[dataCol].max()
    
    # define a colorscale
    color_step = 100 # more color_step = smoother color transition
    color_scale, colorbar_scale = colorscale(colorPalette='RdYlBu', color_step=color_step)
    
    # add a dummy scatter trace to generate a colorbar
    mock_location = map_df.loc[0].geometry.centroid.xy
    ticktext = cbar_ticktext
    tickvals = cbar_tickvals
    gen_colorbar(plot_data, mock_location, cbar_x, cbar_y, colorbarname, cbar_type, 
                 colorscale=colorbar_scale, vmin=min_value, vmax=max_value, 
                 tickvals=tickvals, ticktext=ticktext)
    
    # loop over all provinces
    for index,row in map_df.iterrows():

        # select fillcolor (bound to 0 and max. color_index) according to the current value 
        # with respect to the min_value and max_value
        # fillcolor is adjusted for 'linear' and 'log' mode
        if cbar_type=='linear':
            color_index = max(int((row[dataCol]-min_value)/(max_value-min_value)*color_step)-1,0)
        elif cbar_type=='log':
            color_index = max(int((np.log10(row[dataCol])-np.log10(min_value))/(np.log10(max_value)-np.log10(min_value))*color_step)-1,0)
        color_index = min(color_index,color_step-1)
        fillcolor = color_scale[color_index]

        # generate outlines for a province and fill it with a color
        if row.geometry.type == 'Polygon':
            poly = row.geometry
            plot_outline(plot_data, poly, simplify_factor, fillcolor)

        elif row.geometry.type == 'MultiPolygon':
            for poly in row.geometry:
                plot_outline(plot_data, poly, simplify_factor, fillcolor)

        else: 
            print('stop')

        # generate the centroid for a province
        plot_location(plot_data, row, dataCol, fillcolor, max_value)   

# ============
def gen_layout(map_scale, pix_w, pix_h, title):
    layout = dict(
        title = title,
        hovermode = 'closest',
        xaxis = dict(
            autorange = True,
            showgrid = True,
            zeroline = False,
            fixedrange = True # disable this to get all pan/zoom/... functions
        ),
        yaxis = dict(
            autorange = True,
            showgrid = True,
            zeroline = False,
            fixedrange = True # disable this to get all pan/zoom/... functions
        ),
        margin = dict(t=50,b=20,r=20,l=20),
        width = pix_w*map_scale,
        height = pix_h*map_scale,
        dragmode = 'select',
    )
    
    return layout