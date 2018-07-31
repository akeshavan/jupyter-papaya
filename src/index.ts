import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';
import {
  ICommandPalette
} from '@jupyterlab/apputils';
import '../style/index.css';
import {
  Widget
} from '@phosphor/widgets';


//declare var papaya: any;
//declare var require: any
//var papaya = require('./papaya');

/**
 * Initialization data for the nbpapaya-ext extension.
 */

const extension: JupyterLabPlugin<void> = {
  id: 'nbpapaya-ext',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
    console.log('JupyterLab extension nbpapaya-ext foo is activated!');

    // Create a single widget
    let widget: Widget = new Widget();
    widget.id = 'nbpapaya-jupyterlab';
    widget.title.label = 'papaya.js';
    widget.title.closable = true;

    // Add an image element to the panel
    let pdiv = document.createElement('div');
    pdiv.classList.add("papaya");
    widget.node.appendChild(pdiv);

    // Fetch info about a random comic
    /*fetch('https:////egszlpbmle.execute-api.us-east-1.amazonaws.com/prod').then(response => {
      return response.json();
    }).then(data => {
      pdiv.src = data.img;
      img.alt = data.title;
      img.title = data.alt;
    });*/

    //console.log('papaya object is', papaya);

    // Add an application command
    const command: string = 'papaya:open';
    app.commands.addCommand(command, {
      label: 'papaya viewer',
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.addToMainArea(widget);
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      },
    });

    // Add the command to the palette.
    palette.addItem({command, category: 'Tutorial'});
  }
};


export default extension;
