interface OrgChartNode {
  name: string;
  children: OrgChartNode[];
  attributes?: Record<string, any>;
}

export const convertToOrgChart = (jsonArray: any[]): OrgChartNode => {
  const orgChart: OrgChartNode = {
    name: "",
    children: [],
  };

  const map: Map<string, OrgChartNode> = new Map();

  jsonArray?.forEach((item) => {
    map.set(item.name, {
      name: item.name,
      children: [],
      attributes: {},
    });
  });

  jsonArray?.forEach((item) => {
    const node = map.get(item.name)!;
    if (item.parentName !== null) {
      const parent = map.get(item.parentName)!;
      parent.children.push(node);
    } else {
      orgChart.children.push(node);
    }
  });

  return orgChart;
};
