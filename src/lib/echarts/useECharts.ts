import { useEffect, useRef, useState } from "react";
import type { EChartsOption, SetOptionOpts } from "echarts";
import type { init, ECharts, use as echartsUse } from "echarts/core";
import { setupECharts } from "./utils/chart-init";
import { buildChartOptions, getSetOptionConfig } from "./utils/chart-options";
import { setupEventHandlers } from "./utils/event-handlers";
import { type EChartEventsProps } from "./events";

export type UseEChartsOptions = EChartEventsProps &
    SetOptionOpts &
    EChartsOption &
    Parameters<typeof init>[2] & {
        group?: ECharts["group"];
        theme?: Parameters<typeof init>[1];
        use?: Parameters<typeof echartsUse>[0];
    };

export function useECharts<T extends HTMLElement>(
    options: UseEChartsOptions,
): [(node: T) => void, ECharts | undefined] {
    const containerRef = useRef<T>();
    const echartsRef = useRef<ECharts>();
    const resizeObserverRef = useRef<ResizeObserver>();
    const [started, setStarted] = useState(false);

    const setContainerRef = async (node: T) => {
        if (!node || node === containerRef.current) {
            return;
        }
        if (echartsRef.current) {
            // echartsRef.current.dispose();
        }

        containerRef.current = node;
        echartsRef.current = await setupECharts(node, options);
        resizeObserverRef.current = startResizeObserver();

        setStarted(true);
    };

    const startResizeObserver = () => {
        const resizeObserver = new ResizeObserver(() => {
            echartsRef.current?.resize();
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return resizeObserver;
    };

    // Cleanup effect
    useEffect(() => {
        // return () => echartsRef.current?.dispose?.();
    }, [echartsRef]);

    useEffect(() => {
        if (!echartsRef.current || !started) {
            return;
        }
        if (options.group) {
            echartsRef.current.group = options.group;
        }
    }, [options.group, started, echartsRef.current]);

    // Chart options effect
    useEffect(() => {
        if (!echartsRef.current || !started) {
            return;
        }

        const chartOptions = buildChartOptions(options);
        const setOptionConfig = getSetOptionConfig(options);

        echartsRef.current.setOption(chartOptions, setOptionConfig);
    }, [
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

        //
        options.lazyUpdate,
        options.notMerge,
        options.replaceMerge,
        options.silent,
        options.transition,

        //
        started,
        echartsRef.current,
    ]);

    // Event handlers effect
    useEffect(() => {
        if (!echartsRef.current || !started) {
            return;
        }

        setupEventHandlers(echartsRef.current, options);
    }, [
        started,
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
