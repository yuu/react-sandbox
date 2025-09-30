import type { HTMLAttributes } from "react";
import type { EChartsEventHandlerName } from "./utils/event-handlers";
import type { UseEChartsOptions } from "./useECharts";
import { useECharts } from "./useECharts";

export type EChartProps = UseEChartsOptions &
	Omit<
		HTMLAttributes<HTMLDivElement>,
		keyof UseEChartsOptions | EChartsEventHandlerName
	>;

/**
 * EChart component that wraps ECharts functionality in a React component
 *
 * @example
 * ```tsx
 * <EChart
 *   style={{ height: '400px' }}
 *   xAxis={{ type: 'category', data: ['A', 'B', 'C'] }}
 *   yAxis={{ type: 'value' }}
 *   series={[{ type: 'bar', data: [1, 2, 3] }]}
 * />
 * ```
 */
export const EChart = ({
	// Initialization options
	opts,

	// ECharts instance options
	group,

	// SetOption options
	setOption,

	// ?
	darkMode,
	media,
	options,
	stateAnimation,

	// Chart options
	angleAxis,
	animation,
	animationDelay,
	animationDelayUpdate,
	animationDuration,
	animationDurationUpdate,
	animationEasing,
	animationEasingUpdate,
	animationThreshold,
	aria,
	axisPointer,
	backgroundColor,
	blendMode,
	brush,
	calendar,
	color,
	dataZoom,
	dataset,
	geo,
	graphic,
	grid,
	hoverLayerThreshold,
	legend,
	parallel,
	parallelAxis,
	polar,
	progressive,
	progressiveThreshold,
	radar,
	radiusAxis,
	series,
	singleAxis,
	textStyle,
	timeline,
	title,
	toolbox,
	tooltip,
	useUTC,
	visualMap,
	xAxis,
	yAxis,

	// Event handlers
	onAxisAreaSelected,
	onBrush,
	onBrushEnd,
	onBrushSelected,
	onClick,
	onContextMenu,
	onDataRangeSelected,
	onDataViewChanged,
	onDataZoom,
	onDoubleClick,
	onDownplay,
	onFinished,
	onGeoSelectChanged,
	onGeoSelected,
	onGeoUnselected,
	onGlobalCursorTaken,
	onGlobalOut,
	onHighlight,
	onLegendInverseSelect,
	onLegendScroll,
	onLegendSelectChanged,
	onLegendSelected,
	onLegendUnselected,
	onMagicTypeChanged,
	onMouseDown,
	onMouseMove,
	onMouseOut,
	onMouseOver,
	onRendered,
	onRestore,
	onSelectChanged,
	onTimelineChanged,
	onTimelinePlayChanged,

	...rest
}: EChartProps) => {
	// Use ECharts hook
	const [ref] = useECharts<HTMLDivElement>({
		// Initialization options
		opts,

		// ECharts instance options
		group,

		// SetOption options
		setOption,

		// options
		darkMode,
		media,
		options,
		stateAnimation,

		// Chart options
		angleAxis,
		animation,
		animationDelay,
		animationDelayUpdate,
		animationDuration,
		animationDurationUpdate,
		animationEasing,
		animationEasingUpdate,
		animationThreshold,
		aria,
		axisPointer,
		backgroundColor,
		blendMode,
		brush,
		calendar,
		color,
		dataZoom,
		dataset,
		geo,
		graphic,
		grid,
		hoverLayerThreshold,
		legend,
		parallel,
		parallelAxis,
		polar,
		progressive,
		progressiveThreshold,
		radar,
		radiusAxis,
		series,
		singleAxis,
		textStyle,
		timeline,
		title,
		toolbox,
		tooltip,
		useUTC,
		visualMap,
		xAxis,
		yAxis,

		// Event handlers
		onAxisAreaSelected,
		onBrush,
		onBrushEnd,
		onBrushSelected,
		onClick,
		onContextMenu,
		onDataRangeSelected,
		onDataViewChanged,
		onDataZoom,
		onDoubleClick,
		onDownplay,
		onFinished,
		onGeoSelectChanged,
		onGeoSelected,
		onGeoUnselected,
		onGlobalCursorTaken,
		onGlobalOut,
		onHighlight,
		onLegendInverseSelect,
		onLegendScroll,
		onLegendSelectChanged,
		onLegendSelected,
		onLegendUnselected,
		onMagicTypeChanged,
		onMouseDown,
		onMouseMove,
		onMouseOut,
		onMouseOver,
		onRendered,
		onRestore,
		onSelectChanged,
		onTimelineChanged,
		onTimelinePlayChanged,
	});

	return <div {...rest} ref={ref} />;
};
