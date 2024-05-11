import {Article, ArticleGetter} from "../types/wiki";

export const buildTree = (flat:ArticleGetter[]) => {
    const nodeMap :{[id:number]:Article}= {}
    for(const article  of flat){
        nodeMap[article.id] = {
            ...article,
            children: []
        };
    }

    for (const article of flat){
        if (article.father_id !== null && article.father_id !== undefined) {
            const parent = nodeMap[article.father_id as number];
            if (parent) {
                parent.children.push(nodeMap[article.id]);
            }
        }
    }
    return Object.values(nodeMap).filter(node => node.father_id === null);
}