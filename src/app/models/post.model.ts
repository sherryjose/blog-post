export interface IPost {
    data: IPostData[];
}

export interface IPostData {
    id: number;
    user_id: number;
    title: string;
    body: string;
}
    // code: 200,
    // meta: {
    //     pagination: {
    //         total: 1390,
    //         pages: 70,
    //         page: 1,
    //         limit: 20
    //     }
    // },
    // data: [
    //     {
    //         id: 30,
    //         user_id: 30,
    //         title: 'Cinis considero ulterius aut sophismata currus cervus sed supra vereor.',
    //         body: 'Sit crustulum thermae. Deputo volutabrum deorsum. Vindico solutio necessitatibus. Harum tener vociferor. Contra talus ipsam. Apostolus confido argumentum. Creo decretum pectus. Aurum alius ut. Deficio supellex usitas. Brevis via velit. Tripudio vinculum coepi. Adsum aeneus curtus. Deripio pecto ad. Voluptas ut cultura. Quia aestivus volutabrum.',
    //         created_at: '2020-12-23T03:50:04.562+05:30',
    //         updated_at: '2020-12-23T03:50:04.562+05:30'
    //     }
    // ]