# ImageInspector

Image inspector is a simple website that can be used to visualize custom webgl filters applied on an uploaded image.

The working example can be found [here](https://image-inspector.tomasz-rewak.com/).

A few words about the project can be found [here](https://www.youtube.com/watch?v=BxRKhU4ygFk).

<p align="center">
  <img src="https://github.com/TomaszRewak/ImageInspector/blob/master/about/example.gif?raw=true" width=800/>
</p>

The website allows you to create custom layers by modifying predefined vertex and fragment shaders. You can also inspect the exact value calculated at the specific location simply by hovering the cursor over the selected pixel.

The project is written in: TypeScript + React.js + WebGL + [Ace editor](https://github.com/ajaxorg/ace).

To build the project run the `npx webpack` command. Generated files should appear in the `dist/` folder.
