require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/ScaleBar",
    "esri/widgets/Legend",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/widgets/BasemapGallery",
    "esri/layers/FeatureLayer",
    "esri/Basemap",
    "esri/widgets/Expand"
], function(
    Map, MapView, ScaleBar, Legend, Search, LayerList, BasemapGallery, FeatureLayer, Basemap, Expand
) {
    // 创建地图
    const map = new Map({
        basemap: "streets-navigation-vector"
    });

    // 添加专题图层 - 世界城市人口
    const citiesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",
        title: "世界主要城市",
        popupTemplate: {
            title: "{CITY_NAME}",
            content: [{
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "POP",
                        label: "人口",
                        format: {
                            digitSeparator: true,
                            places: 0
                        }
                    },
                    {
                        fieldName: "POP_RANK",
                        label: "人口排名"
                    },
                    {
                        fieldName: "POP_CLASS",
                        label: "人口等级"
                    }
                ]
            }]
        }
    });
    map.add(citiesLayer);

    // 创建视图
    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [116.4, 39.9], // 北京坐标
        zoom: 4
    });

    // 添加比例尺
    const scaleBar = new ScaleBar({
        view: view,
        unit: "metric"
    });
    view.ui.add(scaleBar, {
        position: "bottom-left"
    });

    // 添加图例
    const legend = new Legend({
        view: view
    });
    view.ui.add(legend, "top-right");

    // 添加搜索框
    const search = new Search({
        view: view
    });
    view.ui.add(search, {
        position: "top-left",
        index: 0
    });

    // 添加图层列表
    const layerList = new LayerList({
        view: view
    });
    view.ui.add(layerList, {
        position: "top-right",
        index: 1
    });

    // 添加底图库
    const basemapGallery = new BasemapGallery({
        view: view
    });
    document.getElementById("basemapGalleryDiv").appendChild(basemapGallery.domNode);

    // 当视图加载完成后
    view.when(() => {
        console.log("地图加载完成");
    });
});