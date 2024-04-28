
export interface MenuItem{
    title: string;// 菜单组标题
    items:Item[]; // 菜单项
}
export interface Item{
    itemIcon:string; // 菜单图标
    itemName:string; // 菜单名
    itemPath:string;
    itemColor?:string
}

export interface Menu{
    defaultPath:string;
    menus : MenuItem[]
}
