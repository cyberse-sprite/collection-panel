export const filterTagType=(input)=>{
    const f={
        author:"作者",
        charactor:"角色",
        relationship:"关系",
        group:"社团",
        activity:"展会",
        origin:"原作",
        translator:"译者",
        xp:"内容"
    }
    return f[input]
}