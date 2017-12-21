package com.seavus.libraryEntity;

import com.seavus.libraryEntity.model.Book;
import com.seavus.libraryEntity.model.User;
import com.seavus.libraryEntity.repository.BookRepository;
import com.seavus.libraryEntity.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class JpaApplication implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(JpaApplication.class);

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(JpaApplication.class, args);
    }

    @Override
    @Transactional
    public void run(String... strings) throws Exception {
        // save a couple of books
        User userA = new User("Ivana", "Rancic");
        User userB = new User("User B", "Rancic");
        User userC = new User("User C","User");
        Book book = new Book("BOOK 1,");
        List<User> users= new ArrayList<User>();
        users.add(userA);
        users.add(userB);
        users.add(userC);
        book.setUsers(users);

        bookRepository.save(book);

        // fetch all books
        System.out.println("Printing all books....");
        for(Book b : bookRepository.findAll()) {
            System.out.println(b.toString());
            //logger.info(book.toString());
        }

        // save a couple of users
        Book bookA = new Book("Book A");
        Book bookB = new Book("Book B");

        User user = new User("User A","Stojkovski");
        List<Book> books= new ArrayList<Book>();
        books.add(bookA);
        books.add(bookB);
        user.setBooks(books);

        userRepository.save(user);

        // fetch all users
        for(User u : userRepository.findAll()) {
            logger.info(u.toString());
        }
    }
}