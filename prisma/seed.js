const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdUsers = await prisma.user.createMany({
        data: [
            { username: 'alicem', email: 'alicemartin@gmail.com'},
        ]
    });

    console.log(`${createdUsers.count} users created`, createdUsers);

    // Add your code here

    const createProfile = await prisma.profile.create({
        data: {
            profilePic: "randomUrl.co.whatever",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing",
            userId: 1
        }
    })

    const createPost = await prisma.post.createMany({
        data: [{
            title: "Blogle Post 1",
            content: "Lorem ipsum dolor sit amet. Quo architecto optio sit provident nisi et necessitatibus enim ea expedita quaerat. Et harum quos ut ullam voluptas a internos fugiat ut corrupti repellat hic neque omnis. Vel odio cupiditate aut autem soluta et eligendi quos assumenda autem qui magni doloribus et laborum libero ut nihil repellendus. Vel iusto corrupti non quia iure et maiores dolor.",
            imgURL: "image.url.com",
            published: true,
            profileId: 1
        },
        {
            title: "Blogle Post 2",
            content: "Lorem ipsum dolor sit amet. Quo architecto optio sit provident nisi et necessitatibus enim ea expedita quaerat. Et harum quos ut ullam voluptas a internos fugiat ut corrupti repellat hic neque omnis. Vel odio cupiditate aut autem soluta et eligendi quos assumenda autem qui magni doloribus et laborum libero ut nihil repellendus. Vel iusto corrupti non quia iure et maiores dolor.",
            published: true,
            profileId: 1
        },
    ]
    })


    const createComment = await prisma.comment.create({
        data: {
            content: "250 characters or less baby",
            postId: 1,
            userId: 1,
            replies : {
                create : [{
                    content: "Keepin' it below 250 chars since the beginning",
                    postId: 1,
                    userId: 1
                }]
            }      
        },
    })

    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })