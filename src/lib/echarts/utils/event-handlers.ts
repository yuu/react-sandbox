import type { ECharts } from "echarts/core";
import { echartsEvents } from "../events";
import type {
	EChartsEvent,
	EChartEventsProps,
	EChartsEventProp,
} from "../events";

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
		const handler = options[propName as EChartsEventProp];
		if (typeof handler === "function") {
			instance.on(eventName as EChartsEvent, handler);
		}
	}
}
