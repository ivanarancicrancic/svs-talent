package libraryJpa.service;


import libraryJpa.model.Library_user;
import libraryJpa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("userService")
@Component
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository repository;

    @Override
    public Library_user createUser(Library_user libraryuser){ return repository.createUser(libraryuser); }

    @Override
    public List<Library_user> getAllLibAccounts(){
        System.out.println("Entered ServiceImpl getAllUsers..");

        return repository.getAllLibAccounts();
}

    @Override
    public Library_user getUser(Long id){ return repository.getUser(id);}

    @Override
    public Library_user updateUser(Long id, Library_user libraryuser){ return repository.updateUser(id, libraryuser);}

    @Override
    public Library_user deleteUser(Long id){ return repository.deleteUser(id);}

}
