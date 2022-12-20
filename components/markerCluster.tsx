// @ts-expect-error Missing type definitions
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { divIcon, point } from 'leaflet';
import type { ComponentChildren, FunctionalComponent } from 'preact';

const createClusterCustomIcon = (cluster: any) => {
  return divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'customMarker',
    iconSize: point(50, 50, true),
  });
};

const MarkerCluster: FunctionalComponent<{
  children: ComponentChildren;
  zoom: number;
}> = ({ children, zoom }) => {
  return (
    <MarkerClusterGroup
      maxClusterRadius={80}
      iconCreateFunction={createClusterCustomIcon}
      showCoverageOnHover={false}
    >
      {children}
    </MarkerClusterGroup>
  );
};

export default MarkerCluster;
