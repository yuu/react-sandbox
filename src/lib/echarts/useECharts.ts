import { useEffect, useRef, useState } from "react";
import type { EChartsOption, SetOptionOpts } from "echarts";
import type { ECharts } from "echarts/core";
import {
    setupECharts,
    type EChartsInitializeOptsWithUse,
} from "./utils/chart-init";
import { buildChartOptions } from "./utils/chart-options";
import {
    setupEventHandlers,
    type EChartEventsProps,
} from "./utils/event-handlers";

export type UseEChartsOptions = EChartsOption &
    EChartEventsProps & {
        opts?: EChartsInitializeOptsWithUse;
        setOption?: SetOptionOpts;
        group?: ECharts["group"];
    };

export function useECharts<T extends HTMLElement>(
    options: UseEChartsOptions,
): [(node: T) => void, ECharts | null] {
    const containerRef = useRef<T>();
    const echartsRef = useRef<ECharts | null>(null);
    const resizeObserverRef = useRef<ResizeObserver>();

    const setContainerRef = async (node: T) => {
        if (!node) {
            console.warn("container node undefined");
            echartsRef.current = null;
            return;
        }
        if (echartsRef.current) {
            console.warn("echarts instance already initialized");
            return;
        }

        console.log("initialize");
        containerRef.current = node;

        const resizeObserver = new ResizeObserver(() => {
            echartsRef.current?.resize();
        });
        resizeObserverRef.current = resizeObserver;
        resizeObserver.observe(node);

        echartsRef.current =
            (await setupECharts(node, options.opts ?? {})) ?? null;
        const chartOptions = buildChartOptions(options);
        echartsRef.current?.setOption(chartOptions, options.setOption);
    };

    // Cleanup effect
    useEffect(() => {
        return () => {
            echartsRef.current?.dispose?.();
            resizeObserverRef.current?.disconnect?.();
            containerRef.current = undefined;
            echartsRef.current = null;
            resizeObserverRef.current = undefined;
        };
    }, [echartsRef]);

    // Change group effect
    useEffect(() => {
        if (!echartsRef.current) {
            return;
        }
        if (options.group) {
            echartsRef.current.group = options.group;
        }
    }, [options.group, echartsRef.current]);

    // Chart options effect
    useEffect(() => {
        if (!echartsRef.current) {
            return;
        }

        const chartOptions = buildChartOptions(options);
        echartsRef.current.setOption(chartOptions, options.setOption);
    }, [
        echartsRef.current,
        options.angleAxis,
        options.animation,
        options.animationDelay,
        options.animationDelayUpdate,
        options.animationDuration,
        options.animationDurationUpdate,
        options.animationEasing,
        options.animationEasingUpdate,
        options.animationThreshold,
        options.aria,
        options.axisPointer,
        options.backgroundColor,
        options.blendMode,
        options.brush,
        options.calendar,
        options.color,
        options.darkMode,
        options.dataset,
        options.dataZoom,
        options.geo,
        options.graphic,
        options.grid,
        options.hoverLayerThreshold,
        options.legend,
        options.media,
        options.options,
        options.parallel,
        options.parallelAxis,
        options.polar,
        options.progressive,
        options.progressiveThreshold,
        options.radar,
        options.radiusAxis,
        options.series,
        options.singleAxis,
        options.stateAnimation,
        options.textStyle,
        options.timeline,
        options.title,
        options.toolbox,
        options.tooltip,
        options.useUTC,
        options.visualMap,
        options.xAxis,
        options.yAxis,
        options.setOption,
    ]);

    // Event handlers effect
    useEffect(() => {
        if (!echartsRef.current) {
            return;
        }

        setupEventHandlers(echartsRef.current, options);
    }, [
        echartsRef.current,
        options.onAxisAreaSelected,
        options.onBrush,
        options.onBrushEnd,
        options.onBrushSelected,
        options.onClick,
        options.onContextMenu,
        options.onDataRangeSelected,
        options.onDataViewChanged,
        options.onDataZoom,
        options.onDoubleClick,
        options.onDownplay,
        options.onFinished,
        options.onGeoSelectChanged,
        options.onGeoSelected,
        options.onGeoUnselected,
        options.onGlobalCursorTaken,
        options.onGlobalOut,
        options.onHighlight,
        options.onLegendInverseSelect,
        options.onLegendScroll,
        options.onLegendSelectChanged,
        options.onLegendSelected,
        options.onLegendUnselected,
        options.onMagicTypeChanged,
        options.onMouseDown,
        options.onMouseMove,
        options.onMouseOut,
        options.onMouseOver,
        options.onRendered,
        options.onRestore,
        options.onSelectChanged,
        options.onTimelineChanged,
        options.onTimelinePlayChanged,
    ]);

    return [setContainerRef, echartsRef.current];
}
