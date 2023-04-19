import type { Meta, StoryObj } from '@storybook/react';

import ButtonWithIcon from "../components/UI/Buttons/ButtonWithIcon/ButtonWithIcon";

const meta: Meta<typeof ButtonWithIcon> = {
    title: 'UI/ButtonWithIcon',
    component: ButtonWithIcon,
    tags: ['autodocs'],
    argTypes: {
        color: {
            description: 'Варианты цветов кнопки',
            defaultValue: 'default',
            options: ['default', 'red', 'gray'],
            control: {
                type: 'radio'
            }
        },
        title: {
            description: 'Варианты написания заголовка. Массив может принимать 1 или 2 значения',
            options: [
                [undefined],
                ['Кнопка'],
                ['Составная', 'Кнопка']
            ]
        },
        svg: {
            description: `Поле для передачи иконки в формате &lt;svg>...</svg>`,
            options: [
                undefined,
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"> <title/> <g id="Complete"> <g id="mail"> <g> <polyline fill="none" points="4 8.2 12 14.1 20 8.2" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/> <rect fill="none" height="14" rx="2" ry="2" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="6.5"/> </g> </g> </g> </g></svg>
            ]
        },
        onClick: {
            description: `Поле для назначения действия на кнопку`,
            options: [function() {alert('Кнопка нажата')}],
            control: {
                type: 'radio'
            }
        }
    }
};
  
export default meta;
type Story = StoryObj<typeof ButtonWithIcon>;

export const onlyText: Story = {
    args: {
        title: ['Button'],
    },
};


    export const onlyIcon: Story = {
        args: {
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"> <title/> <g id="Complete"> <g id="mail"> <g> <polyline fill="none" points="4 8.2 12 14.1 20 8.2" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/> <rect fill="none" height="14" rx="2" ry="2" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="6.5"/> </g> </g> </g> </g></svg>
        },
    };

    export const iconAndText: Story = {
        args: {
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"> <title/> <g id="Complete"> <g id="mail"> <g> <polyline fill="none" points="4 8.2 12 14.1 20 8.2" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/> <rect fill="none" height="14" rx="2" ry="2" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="6.5"/> </g> </g> </g> </g></svg>,
            title: ['Button']
        },
    };

    export const iconAndDoubleText: Story = {
        args: {
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#fff" d="M18.472 6.564c-1.491 1.071-2.237 2.36-2.237 3.867 0 1.805.922 3.19 2.765 4.155-.495 1.454-1.211 2.72-2.15 3.798C15.914 19.46 15.057 20 14.282 20c-.365 0-.863-.122-1.495-.367l-.303-.119c-.618-.244-1.166-.367-1.641-.367-.45 0-.941.096-1.475.288l-.381.139-.48.198c-.377.152-.758.228-1.142.228-.906 0-1.905-.757-3-2.27C2.788 15.56 2 13.197 2 10.64c0-1.818.492-3.283 1.475-4.393.984-1.11 2.286-1.666 3.908-1.666.606 0 1.173.112 1.7.337l.362.149.38.159c.34.145.613.218.822.218.267 0 .563-.063.889-.189l.498-.198.371-.139c.593-.218 1.247-.327 1.964-.327 1.7 0 3.068.658 4.103 1.973zM14.447 0c.02.231.03.41.03.535 0 1.144-.41 2.147-1.232 3.01-.82.863-1.774 1.294-2.862 1.294-.033-.258-.05-.443-.05-.555 0-.972.382-1.884 1.144-2.737C12.239.694 13.122.195 14.125.05c.071-.014.179-.03.322-.05z"/></svg>,
            title: ["Загрузить в", 'App Store']
        },
    };