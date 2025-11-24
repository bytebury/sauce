export function fromKB(kb: number): number {
  return Math.ceil(kb * 1024);
}

export function fromMB(mb: number): number {
  return Math.ceil(mb * 1024 ** 2);
}

export function fromGB(gb: number): number {
  return Math.ceil(gb * 1024 ** 3);
}

export function fromTB(tb: number): number {
  return Math.ceil(tb * 1024 ** 4);
}

export function fromPB(pb: number): number {
  return Math.ceil(pb * 1024 ** 5);
}

export function toKB(bytes: number): number {
  return bytes / 1024;
}

export function toMB(bytes: number): number {
  return bytes / (1024 ** 2);
}

export function toGB(bytes: number): number {
  return bytes / (1024 ** 3);
}

export function toTB(bytes: number): number {
  return bytes / (1024 ** 4);
}

export function toPB(bytes: number): number {
  return bytes / (1024 ** 5);
}
