"use client";
import { useEffect, useRef } from "react";
import MemoryWeb from "./MemoryWeb";
import * as d3 from "d3";

const dummyData = {
  nodes: [
    { id: "you", label: "You", group: 1 },
    { id: "lucidian", label: "Lucidian", group: 2 },
    { id: "dream", label: "Dream Log", group: 3 },
    { id: "memory1", label: "Childhood Memory", group: 3 },
    { id: "emotion", label: "Emotional Reflection", group: 4 },
  ],
  links: [
    { source: "you", target: "lucidian" },
    { source: "lucidian", target: "dream" },
    { source: "lucidian", target: "memory1" },
    { source: "lucidian", target: "emotion" },
  ],
};

export default function MemoryWebPanel() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;

    const simulation = d3.forceSimulation(dummyData.nodes)
      .force("link", d3.forceLink(dummyData.links).id((d) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(dummyData.links)
      .join("line")
      .attr("stroke-width", 2);

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(dummyData.nodes)
      .join("circle")
      .attr("r", 10)
      .attr("fill", (d) => d3.schemeTableau10[d.group])
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    const label = svg
      .append("g")
      .selectAll("text")
      .data(dummyData.nodes)
      .join("text")
      .text((d) => d.label)
      .attr("font-size", 10)
      .attr("dx", 12)
      .attr("dy", ".35em")
      .attr("fill", "#ccc");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);

      label
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, []);

  return (
    <div className="mt-6 border rounded-xl p-4">
      <h2 className="font-semibold mb-2 text-lg">🕸️ Lucidian Memory Web</h2>
      <svg ref={svgRef} width={600} height={400} className="rounded-md bg-gray-900" />
    </div>
  );
}
