import type { ECharts } from "echarts/core";

export type EChartsEvent =
	| "axisareaselected"
	| "brush"
	| "brushend"
	| "brushselected"
	| "click"
	| "contextmenu"
	| "datarangeselected"
	| "dataviewchanged"
	| "datazoom"
	| "dblclick"
	| "downplay"
	| "finished"
	| "geoselectchanged"
	| "geoselected"
	| "geounselected"
	| "globalcursortaken"
	| "globalout"
	| "highlight"
	| "legendinverseselect"
	| "legendscroll"
	| "legendselectchanged"
	| "legendselected"
	| "legendunselected"
	| "magictypechanged"
	| "mousedown"
	| "mousemove"
	| "mouseout"
	| "mouseover"
	| "rendered"
	| "restore"
	| "selectchanged"
	| "timelinechanged"
	| "timelineplaychanged";

export type EChartsEventHandlerName =
	| "onAxisAreaSelected"
	| "onBrush"
	| "onBrushEnd"
	| "onBrushSelected"
	| "onClick"
	| "onContextMenu"
	| "onDataRangeSelected"
	| "onDataViewChanged"
	| "onDataZoom"
	| "onDoubleClick"
	| "onDownplay"
	| "onFinished"
	| "onGeoSelectChanged"
	| "onGeoSelected"
	| "onGeoUnselected"
	| "onGlobalCursorTaken"
	| "onGlobalOut"
	| "onHighlight"
	| "onLegendInverseSelect"
	| "onLegendScroll"
	| "onLegendSelectChanged"
	| "onLegendSelected"
	| "onLegendUnselected"
	| "onMagicTypeChanged"
	| "onMouseDown"
	| "onMouseMove"
	| "onMouseOut"
	| "onMouseOver"
	| "onRendered"
	| "onRestore"
	| "onSelectChanged"
	| "onTimelineChanged"
	| "onTimelinePlayChanged";

export type EChartEventsProps = {
	[K in EChartsEventHandlerName]?: () => any;
};

export const echartsEvents: Record<EChartsEventHandlerName, EChartsEvent> = {
	onClick: "click",
	onDoubleClick: "dblclick",
	onMouseDown: "mousedown",
	onMouseMove: "mousemove",
	onMouseOver: "mouseover",
	onMouseOut: "mouseout",
	onGlobalOut: "globalout",
	onContextMenu: "contextmenu",
	onHighlight: "highlight",
	onDownplay: "downplay",
	onSelectChanged: "selectchanged",
	onLegendSelectChanged: "legendselectchanged",
	onLegendSelected: "legendselected",
	onLegendUnselected: "legendunselected",
	onLegendInverseSelect: "legendinverseselect",
	onLegendScroll: "legendscroll",
	onDataZoom: "datazoom",
	onDataRangeSelected: "datarangeselected",
	onTimelineChanged: "timelinechanged",
	onTimelinePlayChanged: "timelineplaychanged",
	onRestore: "restore",
	onDataViewChanged: "dataviewchanged",
	onMagicTypeChanged: "magictypechanged",
	onGeoSelectChanged: "geoselectchanged",
	onGeoSelected: "geoselected",
	onGeoUnselected: "geounselected",
	onAxisAreaSelected: "axisareaselected",
	onBrush: "brush",
	onBrushEnd: "brushend",
	onBrushSelected: "brushselected",
	onGlobalCursorTaken: "globalcursortaken",
	onRendered: "rendered",
	onFinished: "finished",
} as const;

// Clear all existing event listeners
function clearEventListeners(instance: ECharts) {
	for (const [_, eventName] of Object.entries(echartsEvents)) {
		instance.off(eventName);
	}
}

// Setup new event listeners based on provided options
export function setupEventHandlers(
	instance: ECharts,
	options: EChartEventsProps,
) {
	// Clear existing listeners to prevent duplicates
	clearEventListeners(instance);

	for (const [propName, eventName] of Object.entries(echartsEvents)) {
		const handler = options[propName as EChartsEventHandlerName];
		if (typeof handler === "function") {
			instance.on(eventName as EChartsEvent, handler);
		}
	}
}
