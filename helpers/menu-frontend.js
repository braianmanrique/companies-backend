 const getMenuFront =  (role = 'USER_ROLE') => {

    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu: [
            {title: 'Main', url: '/'},
           
          ]
        },
        {
          title: 'Supporting',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // {title: 'Users', url: 'users'},
            // {title: 'Articles', url: 'articles'}
            {title: 'Companies', url: 'companies'},
            
          ]
        }
    ];
    if(role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift( {title: 'Users', url: 'users'},);
        menu[1].submenu.unshift( {title: 'Stock', url: 'articles'},)
    }
    return menu;
      
}


module.exports = {
    getMenuFront
}