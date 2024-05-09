export const buildTree = (flat:Article[]) => {
    const nodeMap :{[id:number]:Article}= {}
    for(const article  of flat){
        nodeMap[article.id] = article
    }

    for (const article of flat){
        if (article.father_id !== null) {
            const parent = nodeMap[article.father_id as number];
            if (parent) {
                parent.children.push(article);
            }
        }
    }
    return Object.values(nodeMap).filter(node => node.father_id === null);
}