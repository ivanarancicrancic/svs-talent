package libraryJpa.repository;


import libraryJpa.model.Book;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface BookRepository1 {

   public List<Book> getBooks();

    public Book getBook(Long id);

    public Book createBook(Book book);

    public Book updateBook(Long id, Book book);

    public Book deleteBook(Long id);


}
