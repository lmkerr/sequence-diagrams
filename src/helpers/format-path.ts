const formatPath = (path: string) => {
    // Remove the "diagrams/" prefix if it exists
    const trimmedPath = path.replace(/^diagram\//, '');
    
    // Remove the file extension while allowing periods in the file name
    const noExtension = trimmedPath.replace(/\.[^.]*$/, '');
    
    // Split the path into segments, capitalize each segment, and join them with " / "
    return noExtension.split('/').map(segment =>
        segment.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
    ).join(' / ');
}

export { formatPath }