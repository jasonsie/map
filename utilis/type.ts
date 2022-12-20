interface laglon {
  height: number;
  x: number;
  y: number;
  memo: string;
}

export interface trail {
  TRAILID: number;
  TR_CNAME: string;
  GUIDE_CONTENT: string;
  TR_POSITION: string;
  TR_ENTRANCE: laglon[];
  TR_ALT: string;
  URL: string;
}
