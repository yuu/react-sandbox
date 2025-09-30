import type { ECharts } from "echarts/core";
import { echartsEvents } from "../events";
import type { EChartsEvent, EChartsEventProp } from "../events";
import type { UseEChartsOptions } from "../useECharts";

// Clear all existing event listeners
function clearEventListeners(instance: ECharts) {
	for (const eventName of Object.keys(echartsEventsMap)) {
		instance.off(eventName);
	}
}

// Setup new event listeners based on provided options
export function setupEventHandlers(
	instance: ECharts,
	options: UseEChartsOptions,
) {
	// Clear existing listeners to prevent duplicates
	clearEventListeners(instance);

	for (const [propName, eventName] of Object.entries(echartsEvents)) {
		const handler = options[propName];
		if (typeof handler === "function") {
			instance.on(eventName as EChartsEvent, handler);
		}
	}
}
