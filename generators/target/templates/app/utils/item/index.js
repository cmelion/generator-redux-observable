
export const getId = (item)=>(
    item._id
);

export const hasSameId = (item, item2)=> (
    getId(item) === getId(item2)
);

export const patchDefaultValues = (item)=>(
    {
        ...item
    }
);

