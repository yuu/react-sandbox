import {
	init,
	use as echartsUse,
	type ECharts,
	type EChartsInitOpts,
} from "echarts/core";

export type EChartsInitializeOpts = EChartsInitOpts & {
	theme?: Parameters<typeof init>[1];
};

export type EChartsInitializeOptsWithUse = EChartsInitializeOpts & {
	use?: Parameters<typeof echartsUse>[0];
};

export async function getGlobalUse() {
	const modules = [
		import("echarts/features"),
		import("echarts/charts"),
		import("echarts/components"),
		import("echarts/renderers"),
	];

	const loadedModules = await Promise.all(
		modules.map((m) => m.then((m) => Object.values(m))),
	);

	return loadedModules.flat();
}

export function initializeECharts<T extends HTMLElement>(
	container: T,
	options: EChartsInitializeOpts,
) {
	const { theme, ...opts } = options;

	return init(container, theme, opts);
}

export async function setupECharts<T extends HTMLElement>(
	container: T,
	options: EChartsInitializeOptsWithUse,
): Promise<ECharts | undefined> {
	if (!container) return;

	const useOpts = options.use || (await getGlobalUse());
	echartsUse(useOpts);

	return initializeECharts(container, options);
}
